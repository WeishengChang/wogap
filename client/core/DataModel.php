<?php

abstract class DataModel {
	//Dependency: DBC.php
	// 目的: 建立一致的物件 < -- > DBC 的存取介面
	// Methods:
	// (): 建立基礎物件
	// ($tableName): 載入表格
	// ($tableName, $data)
	// add()
	// add($data)
	// add($data, $filters)
	// update()
	// update($data)
	// update($data, $filters)
	// delete()
	//static public $param = array();	//for update function
	//static public $tablename = '';		//for update function
	//protected $tablename = '';
	//
	//PROPERTY: for basic manipulation
	protected $tablename = '';
	protected $pk = array();
	static private $_param = array();
	
	//PROPERTY: for updating data
	private $data = array();
	private $changed = array();
	private $changedCount = 0;
	//abstract public function update();
	
	public function load() {
		if(!$this->hasPrimaryKey()) {
			return false;
		}
		$p = DBC::queryOneAssoc('SELECT * FROM '.$this->tablename.' WHERE '.$this->pkFilterSQL());
		if(!$p) return;
		extendObject($this, $p);
	}
	
	protected function pkFilterSQL() {
		return self::arrayToQueryFilters($this->pk);
	}
	static public function arrayToQueryFilters($arr) {
		$limit = array();
			foreach($arr as $k=>$v) {
				$limit[] = '`'.$k.'`="'.$v.'"';
			}
			return count($arr) > 0 ? implode(' AND ', $limit) : ' 1 ';
	}
	
	public function hasPrimaryKey() {
		//true: PK有值
		//false: PK無值
		foreach($this->pk as $k=>$v) {
			if(!$v) {
				return false;
			}
		}
		return true;
	}
	
	public function setPrimaryKeys($pks) {
		foreach($this->pk as $key=>$val) {
			if (!isset($pks[$key])) {
				continue;
			}
			$this->pk[$key] = $pks[$key];
		}
	}
	
	static public function setParams($param) {
		$name = get_called_class();
		self::$_param[$name] = $param;
	}
	
	static public function getParams($name = '') {
		if(empty($name)) $name = get_called_class();
		return isset(self::$_param[$name]) ? self::$_param[$name] : array();
	}
	
	public function getPrimaryKeyList() {
		return array_keys($this->pk);
	}
	
	public function __construct($tablename, $pks = array()) {
		$this->tablename = $tablename;
		//抓取表格資料
		$tmpPKs = DBC::getPrimaryKey($this->tablename);
		foreach($tmpPKs as $keyname) {
			$this->pk[$keyname] = null;
		}
		if(!is_array($pks)) return;
		$this->setPrimaryKeys($pks);
		
	}
	
	public function delete() {
		if(!$this->hasPrimaryKey()) {
			return false;
		}
		DBC::query('
			DELETE FROM '.$this->tablename.'
			WHERE '.$this->pkFilterSQL().'
		');
	}
	
	public function dumpAll() {
		$this->changed = array();
		$this->changedCount = 0;
		return $this->data;
	}
	public function dumpChanged() {
		$changed = array();
		foreach(array_unique($this->changed) as $name) {
			$changed[$name] = $this->data[$name];
		}
		$this->changed = array();
		$this->changedCount = 0;
		return $changed;
	}

	public function validate(&$data, $single=false) { return $data; }
	public function sanitize(&$data) { return $data; }
	public function add($data = null) {
		//新增一筆資料進資料庫
		if(is_null($data) || !is_array($data)) {
			$data = $this->dumpAll();
		} else {
			$param = self::getParams(get_called_class());
			$this->updateData($data, $param);
			$data = $this->dumpAll();
		}
		//新增前要先對資料做驗證(validation)，然後再做校正(sanitization)
		/*$changed = filter_var_array($changed, $param);
		if(in_array(null, $changed, true)) {
			$key = array_search(null, $changed, true);
			alert("缺乏欄位資訊:".$key);
		}*/
		
		$this->validate($data);
		$this->sanitize($data);
		//alert($this->wrapInsertSQL(self::$tablename, $changed));
		DBC::query(DBC::wrapInsertSQL($this->tablename, $data));
	}
	public function update($data = null) {
		if(is_null($data) || !is_array($data)) {
			$data = $this->dumpChanged();
		} else {
			$param = self::getParams(get_called_class());
			$this->updateData($data, $param);
			$data = $this->dumpChanged();
		}
//		$filter = array();
//		foreach($data as $k=>$v) {
//			if(!isset($param[$k])) {
//				alert("未知的欄位資訊:".$key);
//			}
//			$filter[$k] = $param[$k];
//		}
//		$changed = filter_var_array($changed, $filter);
//		if(in_array(null, $changed, true)) {
//			$key = array_search(null, $changed, true);
//			alert("缺乏欄位資訊:".$key);
//		}
		$this->validate($data, true);
		$this->sanitize($data);
		DBC::query(DBC::wrapUpdateSQL($this->tablename, $data, $this->pk));
	}
    
	protected function updateData($data = null, $filter = null) {
		if(is_null($data) || !is_array($data))
		{
			return false;
		}
		if(!is_null($filter) && is_array($filter)) {
			//過濾無用資料
			foreach($data as $k=>$v) {
				if(!isset($filter[$k])) {
					unset($data[$k]);
				}
			}
		}
		foreach($data as $k=>$v) {
			$this->$k = $v;
		}
	}
	
	public function __get($name) {
		return (isset($this->data[$name])) ? $this->data[$name] : null;
	}
	
	public function __set($name, $value) {
		/*
		if(isset($this->pk[$name])) {
			$this->pk[$name] = intval($value); //force pk as integer
			return;
		}
		 */
		$this->data[$name] = $value;
		$this->changed[] = $name;
		$this->changedCount = ($this->changedCount+1)%10;
		if($this->changedCount == 0) {
			$this->changed = array_unique($this->changed);
		}
	}
}
?>
