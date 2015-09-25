<?php
class ExchangeModel extends ImplicitWOGAPModel {
	public $table = 'wog_exchange_main';
}

ExchangeModel::setParams(array(
	'ex_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ex_name' => array('filter'=>FILTER_SANITIZE_STRING),
	'ex_money' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ex_amount' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ex_change' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ex_chg_num' => array('filter'=>FILTER_SANITIZE_NUMBER_FLOAT),
	'ex_change_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ex_resupply_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>