<?php
class PlayerLogModel extends ImplicitWOGAPModel {
	public $table = 'wog_log_main';
}

PlayerLogModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'type' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'title' => array('filter'=>FILTER_SANITIZE_STRING),
	'sql_text' => array('filter'=>FILTER_SANITIZE_STRING),
	'datetime' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>