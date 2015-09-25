<?php

trait JQGrid {
	public $separator = ',';
	static public function getJQGridPagerParams($total) {
		$page = (int)filter_input(INPUT_GET, 'page', FILTER_SANITIZE_NUMBER_INT); // get the requested page 
		$limit = filter_input(INPUT_GET, 'rows', FILTER_SANITIZE_NUMBER_INT); // get how many rows we want to have into the grid 
		$sidx = filter_input(INPUT_GET, 'sidx', FILTER_SANITIZE_STRING); // get index row - i.e. user click to sort 
		$sord = filter_input(INPUT_GET, 'sord', FILTER_SANITIZE_STRING); // get the direction 
		if (!$sidx) {
			$sidx = 1;
		}
		$pages = 1;
		if($total > 0) {
			$pages = ceil($total/$limit);
		}
		if ($page > $pages) {
			$page = $pages;
		}
		$start = $limit*($page-1);
		
		return array(
				'page' => $page,
				'pages' => $pages,
				'limit' => $limit,
				'sidx' => $sidx,
				'sord' => $sord,
				'start' => $start,
				'total' => $total
		);
	}
	
	static public function getJQGridSearchParams() {
		//分析搜尋參數
		$search = ' 1 ';
		$sfield = filter_input(INPUT_GET, 'searchField', FILTER_SANITIZE_STRING);
		if($sfield) {
			$sval = filter_input(INPUT_GET, 'searchString', FILTER_SANITIZE_STRING);
			$sop = filter_input(INPUT_GET, 'searchOper', FILTER_SANITIZE_STRING);
			switch($sop) {
				case 'eq': $search = " {$sfield}='{$sval}' "; break;
				case 'ne': $search = " {$sfield}!='{$sval}' "; break;
				case 'bw': $search = " {$sfield} LIKE '{$sval}%' "; break;
				case 'bn': $search = " {$sfield} NOT LIKE '{$sval}%' "; break;
				case 'ew': $search = " {$sfield} LIKE '%{$sval}' "; break;
				case 'en': $search = " {$sfield} NOT LIKE '%{$sval}' "; break;
				case 'nu': $search = " {$sfield} IS NULL "; break;
				case 'nn': $search = " {$sfield} IS NOT NULL "; break;
				case 'in': $search = " {$sfield} IN ({$sval}) "; break;
				case 'ni': $search = " {$sfield} NOT IN ({$sval}) "; break;
				default: 
					alert('不支援的搜尋:'.$sop);
					break;
			}
		}
		return $search;
	}
	public function getJQGridGridData($filters, $options = array()) {
		if(isset($options['idName'])) {
			$pk = $options['idName'];
		} else {
			$pk = DBC::getPrimaryKey($this->table);
			if(count($pk) == 1) {
				$pk = $pk[0];
			}
		}
		$params = self::getJQGridPagerParams($this->getTotal($filters));
		$result = array(
				// Add columns for EasyUI Datagrid
				'columns' => array(),
				'page' => $params['page'],
				'rows' => array(),
				'total' => $params['pages'],
				'records' => $params['total']
		);
		//提供兩種覆蓋SQL的方式: 覆蓋整個SQL或覆蓋部分條件
		$options = array_merge(array(
				'SQL_SELECT' => property_exists(get_class($this), 'fields') ? implode(',', $this->fields): '*',
				'SQL_FROM' => $this->table,
				'SQL_WHERE' => $filters,
				'SQL_ORDERBY' => $params['sidx'].' '.$params['sord'],
				'SQL_LIMIT' => $params['start'].', '.$params['limit']
		), $options);
		//若其中的參數為陣列，則視為call_user_func_array的參數
		if(is_array($options['SQL_ORDERBY'])) {
			$options['SQL_ORDERBY'] = call_user_func_array($options['SQL_ORDERBY'], array($params['sidx'], $params['sord']));
		}
		$sql = isset($options['SQL']) ? $options['SQL'] : '
			SELECT '.$options['SQL_SELECT'].'
			FROM '.$options['SQL_FROM'].'
			WHERE '.$options['SQL_WHERE'].'
			ORDER BY '.$options['SQL_ORDERBY'].'
			LIMIT '.$options['SQL_LIMIT'].'
		' ;
		$query = DBC::query($sql);
		$func = array('self', 'buildID');
		while($d = $query->fetchAssoc()) {
			if(isset($options['sanitize']) && is_array($options['sanitize'])) {
				$d = call_user_func_array($options['sanitize'], array($d));
			}
			//var_export(array($pk, $d, $this->separator));
			if(!$result['columns']) {
				$result['columns'] = array_keys($d);
			}
			$result['rows'][] = array_values($d);
//			$result['rows'][] = array(
//					'id' => is_array($pk) ? call_user_func_array($func, array($pk, $d, $this->separator)) : $d[$pk],
//					'cell' => array_values($d)
//			);
		}
		return $result;
	}
	
	public static function buildID($pks, $data, $glue = ',') {
		//var_export($pks);
		$id = array();
		foreach($pks as $v) {
			if(isset($data[$v])) {
				$id[] = $data[$v];
			}
		}
		return implode($glue, $id);
	}
}
