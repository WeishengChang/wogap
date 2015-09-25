<?php
class PlayerMissionModel extends ImplicitWOGAPModel {
	public $table = 'wog_mission_book';
}

PlayerMissionModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'm_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'm_status' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'm_kill_num' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>