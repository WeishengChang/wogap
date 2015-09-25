<?php
class TeamJoinModel extends ImplicitWOGAPModel {
	public $table = 'wog_team_join';
}

TeamJoinModel::setParams(array(
	't_j_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	't_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	't_j_dateline' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>