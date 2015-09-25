<?php
class ItemSaleModel extends ImplicitWOGAPModel {
	public $table = 'wog_sale';
}

ItemSaleModel::setParams(array(
	's_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_type' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'hs_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ps_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'item_num' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_money' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_type' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'e_money' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'e_p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'dateline' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
));
?>