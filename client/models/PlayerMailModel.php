<?php
class PlayerMailModel extends ImplicitWOGAPModel {
	public $table = 'wog_message_box';
	public function validate(&$data, $single = false) {
		$p = DBC::queryOneAssoc("
			SELECT p_id
			FROM wog_player
			WHERE p_id={$data['p_id']}
		");
		if(!$p) alert('玩家不存在');
	}
}

PlayerMailModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_name' => array('filter'=>FILTER_SANITIZE_STRING),
	'm_subject' => array('filter'=>FILTER_SANITIZE_STRING),
	'm_body' => array('filter'=>FILTER_SANITIZE_STRING),
	'm_read' => array('filter'=>FILTER_VALIDATE_BOOLEAN, 'flags'=>FILTER_NULL_ON_FAILURE),
	'm_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT, 'options'=>array('min_range'=>0))
));
?>