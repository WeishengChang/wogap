<?php
class ItemPlusModel extends ImplicitWOGAPModel {
	public $table = 'wog_plus_list';
}

ItemStoneModel::setParams(array(
	'd_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_lv' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_class' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_at' => array('filter'=>FILTER_SANITIZE_STRING),
	'd_mat' => array('filter'=>FILTER_SANITIZE_STRING),
	'd_df' => array('filter'=>FILTER_SANITIZE_STRING),
	'd_mdf' => array('filter'=>FILTER_SANITIZE_STRING),
	'd_agi' => array('filter'=>FILTER_SANITIZE_STRING),
	'd_str' => array('filter'=>FILTER_SANITIZE_STRING),
	'd_life' => array('filter'=>FILTER_SANITIZE_STRING),
	'd_vit' => array('filter'=>FILTER_SANITIZE_STRING),
	'd_smart' => array('filter'=>FILTER_SANITIZE_STRING),
	'd_au' => array('filter'=>FILTER_SANITIZE_STRING),
	'd_be' => array('filter'=>FILTER_SANITIZE_STRING)
));
?>