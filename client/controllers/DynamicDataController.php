<?php
class DynamicDataController extends Controller{
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function getMasteryName() {
		//抓取職業列表
		$query = DBC::query('SHOW COLUMNS FROM wog_ch_exp');
		$list = array();
		while($d = $query->fetchAssoc()) {
			if(preg_match('/[\w]+_([\d]+)/i', $d['Field'], $match)) {
				$list[] = $match[1];
			}
		}
		$result = array();
		$query = DBC::query('SELECT ch_id, ch_name FROM wog_character WHERE ch_id IN ('.implode(',', array_unique($list)).')');
		while($d = $query->fetchAssoc()) {
			$result[$d['ch_id']] = $d['ch_name'];
		}
		return $result;
	}
}
