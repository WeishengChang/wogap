<?php
class PlayerMercenaryModel extends ImplicitWOGAPModel {
	public $table = 'wog_mercenary_list';
}

PlayerMercenaryModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'me_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'me_name' => array('filter'=>FILTER_SANITIZE_STRING),
	'me_status' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'me_count' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'me_place' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'me_fight_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>