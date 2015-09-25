<?php
class ItemHonorModel extends ImplicitWOGAPModel {
	public $table = 'wog_honor_main';
}

ItemHonorModel::setParams(array(
	'h_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'item_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_type' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'h_1' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'h_2' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'h_3' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'h_4' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'h_5' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'item_num' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>