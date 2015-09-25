<?php

class DBC
{
	static private $db = null;
	static public function setup($dsn, $username = '', $password = '')
	{
		if(is_array($dsn) && isset($dsn['hostname']) && isset($dsn['dbname'])) {
			self::$db = new PDO(
				'mysql:host='.$dsn['hostname'].';dbname='.$dsn['dbname'].';charset=utf8', 
				isset($dsn['username'])?$dsn['username']:$username, 
				isset($dsn['password'])?$dsn['password']:$password
			);
		} else {
			self::$db = new PDO($dsn, $username, $password);
		}
		self::$db->setAttribute(PDO::ATTR_STATEMENT_CLASS, array('PDOStatement_extended', array(self::$db)));
		self::$db->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
	}
	static public function __callStatic($name, $param)
	{
		if(method_exists(self::$db, $name))
		{
			return call_user_func_array(array(self::$db, $name), $param);
		}
		return new Exception("Unknown PDO method.");
	}
	
	static public function getPrimaryKey($table) {
		$list = array();
		$query = self::query('SHOW KEYS FROM '.$table.' WHERE Key_name = "PRIMARY"');
		while($d = $query->fetchAssoc()) {
			$list[] = $d['Column_name'];
		}
		if(count($list) < 1) {
			$keys = self::getUniqueKeys($table);
			return implode('&', $keys);
		} 
		return $list;
	}
	
	static public function getUniqueKeys($table) {
		$keys = array();
		$query = self::query('SHOW KEYS FROM '.$table.' WHERE Non_unique=0');
		while($d = $query->fetchAssoc()) {
			$keys[] = $d['Column_name'];
		}
		return array_unique($keys);
	}
	
	static public function query($sql) {
		$query = call_user_func(array(self::$db, 'query'), $sql);
		if($query === false) {
			$info = self::$db->errorInfo();
			alert("SQL Error {$info[1]}：\n{$info[2]}\n\nSQL：\n{$sql}");
		}
		return $query;
	}
	
	static public function queryOne($sql, $type = PDO::FETCH_BOTH)
	{
		if($query = self::query($sql)) {
			return $query->fetch($type);
		}
		return false;
	}
	static public function queryOneAssoc($sql) {return self::queryOne($sql, PDO::FETCH_ASSOC);}
	static public function queryOneRow($sql) {return self::queryOne($sql, PDO::FETCH_NUM);}
	static public function queryOneCell($sql) {
		$data = self::queryOneRow($sql);
		return is_array($data)?$data[0]:null;
	}
	
	static public function queryAll($sql, $type = PDO::FETCH_BOTH) {
		$query = self::query($sql);
		return $query ? $query->fetchAll($type) : array();
	}
	static public function queryAllAssoc($sql) {return self::queryAll($sql, PDO::FETCH_ASSOC);}
	static public function queryAllRow($sql) {return self::queryAll($sql, PDO::FETCH_NUM);}
	//資料封裝
	
	static public function implodeFilterField($data) {
		return count($data) < 1 ? ' 1 ' : self::implodeField($data, ' AND ');
	}
	
	static public function implodeField($data, $glue = ',') {
		if(!is_array($data)) { return ''; }
		$str = array();
		foreach($data as $k=>$v) {
			$str[] = '`'.$k.'`="'.$v.'"';
		}
		return implode($glue, $str);
	}
	
	static public function wrapInsertSQL($table, $data) {
		if(count($data) < 1) { return ''; }
		$sqlF = array();
		$sqlV = array();
		foreach($data as $k=>$v) {
			$sqlF[] = '`'.$k.'`';
			$sqlV[] = '"'.$v.'"';
		}
			$sqlF = implode(',', $sqlF);
			$sqlV = implode(',', $sqlV);
			return "INSERT INTO $table($sqlF)VALUES($sqlV)";
	}
	
	static public function wrapUpdateSQL($table, $data, $filter) {
		if(!is_array($data) || count($data) < 1) return '';
		$data = self::implodeField($data);
		$filter = self::implodeFilterField($filter);
		return "UPDATE $table SET {$data} WHERE {$filter}";

	}
}

class PDOStatement_extended extends PDOStatement
{
	private $db;
	protected function __construct($db)
	{
		$this->db = $db;
	}
	public function fetchAssoc()
	{
		return $this->fetch(PDO::FETCH_ASSOC);
	}
	public function fetchAllAssoc()
	{
		return $this->fetchAll(PDO::FETCH_ASSOC);
	}
	public function fetchRow()
	{
		return $this->fetch(PDO::FETCH_NUM);
	}
	public function fetchAllRow()
	{
		return $this->fetchAll(PDO::FETCH_NUM);
	}
	
	public function bindInt($param, $value) { return $this->bindValue($param, $value, PDO::PARAM_INT); }
	public function bindStr($param, $value) { return $this->bindValue($param, $value, PDO::PARAM_STR); }
	public function bindBool($param, $value) { return $this->bindValue($param, $value, PDO::PARAM_BOOL); }
	public function bindNull($param, $value) { return $this->bindValue($param, $value, PDO::PARAM_NULL); }
	public function bindLob($param, $value) { return $this->bindValue($param, $value, PDO::PARAM_Lob); }
}
?>