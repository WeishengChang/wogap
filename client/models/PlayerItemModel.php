<?php
class PlayerItemModel extends ImplicitWOGAPModel {
	public $table = 'wog_item';
	static public final function validateA($str) {
		if(preg_match('/[^\d,:]/i', $str, $match)) {
			alert('格式錯誤'.$str);
		}
		return $str;
	}
	static public final function validateB($str) {
		if(preg_match('/[^\d,*]/i', $str, $match)) {
			alert('格式錯誤'.$str);
		}
		return $str;
	}
}

PlayerItemModel::setParams(array(
	'a_id' => array('filter'=>FILTER_CALLBACK, 'options'=>array('PlayerItemModel', 'validateA')),
	'd_body_id' => array('filter'=>FILTER_CALLBACK, 'options'=>array('PlayerItemModel', 'validateA')),
	'd_foot_id' => array('filter'=>FILTER_CALLBACK, 'options'=>array('PlayerItemModel', 'validateA')),
	'd_hand_id' => array('filter'=>FILTER_CALLBACK, 'options'=>array('PlayerItemModel', 'validateA')),
	'd_head_id' => array('filter'=>FILTER_CALLBACK, 'options'=>array('PlayerItemModel', 'validateA')),
	'd_item_id' => array('filter'=>FILTER_CALLBACK, 'options'=>array('PlayerItemModel', 'validateB')),
	'd_stone_id' => array('filter'=>FILTER_CALLBACK, 'options'=>array('PlayerItemModel', 'validateB')),
	'd_honor_id' => array('filter'=>FILTER_CALLBACK, 'options'=>array('PlayerItemModel', 'validateB')),
	'd_key_id' => array('filter'=>FILTER_CALLBACK, 'options'=>array('PlayerItemModel', 'validateB')),
	'd_plus_id' => array('filter'=>FILTER_CALLBACK, 'options'=>array('PlayerItemModel', 'validateB'))
));
?>