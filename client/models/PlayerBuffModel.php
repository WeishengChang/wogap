<?php
class PlayerBuffModel extends ImplicitWOGAPModel {
	public $table = 'wog_player_buffer';
}

PlayerBuffModel::setParams(array(
	'end_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'exp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_exp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'at' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'mat' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'df' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'mdf' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'hp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'sp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>