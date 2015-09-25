<?php
class ExchangeBookModel extends ImplicitWOGAPModel {
	public $table = 'wog_exchange_book';
}

ExchangeBookModel::setParams(array(
	'eb_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ex_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'eb_body' => array('filter'=>FILTER_SANITIZE_STRING),
	'eb_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>