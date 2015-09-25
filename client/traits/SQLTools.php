<?php

trait SQLTools {
	static public function implodeQueryFilters($arr) {
		return count($arr) > 0 ? implode(' AND ', $arr) : ' 1 ';
	}
	static public function arrayToQueryFilters($arr) {
		$limit = array();
			foreach($arr as $k=>$v) {
				$limit[] = '`'.$k.'`="'.$v.'"';
			}
			return self::implodeQueryFilters($arr);
	}
}