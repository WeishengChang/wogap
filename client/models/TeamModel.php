<?php
class TeamModel extends ImplicitWOGAPModel {
	public $table = 'wog_team_main';
}

TeamModel::setParams(array(
	't_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	't_name' => array('filter'=>FILTER_SANITIZE_STRING),
	't_peo' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	't_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>