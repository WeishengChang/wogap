<?php
class PlayerMessageModel extends ImplicitWOGAPModel {
	public $table = 'wog_message';
	public function validate(&$data, $single = false) {
		$p = DBC::queryOneAssoc("
			SELECT p_id
			FROM wog_player
			WHERE p_id={$data['p_id']}
		");
		if(!$p) alert('玩家不存在');
	}
}

PlayerMessageModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'title' => array('filter'=>FILTER_SANITIZE_STRING),
	'from_pid' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'dateline' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>