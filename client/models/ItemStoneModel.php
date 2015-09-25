<?php
class ItemStoneModel extends ImplicitWOGAPModel {
	public $table = 'wog_stone_list';
}

ItemStoneModel::setParams(array(
	'd_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_lv' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_class' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_at' => array('filter'=>FILTER_SANITIZE_STRING),
	's_mat' => array('filter'=>FILTER_SANITIZE_STRING),
	's_df' => array('filter'=>FILTER_SANITIZE_STRING),
	's_mdf' => array('filter'=>FILTER_SANITIZE_STRING),
	's_agl' => array('filter'=>FILTER_SANITIZE_STRING),
	's_str' => array('filter'=>FILTER_SANITIZE_STRING),
	's_life' => array('filter'=>FILTER_SANITIZE_STRING),
	's_vit' => array('filter'=>FILTER_SANITIZE_STRING),
	's_smart' => array('filter'=>FILTER_SANITIZE_STRING),
	's_au' => array('filter'=>FILTER_SANITIZE_STRING),
	's_be' => array('filter'=>FILTER_SANITIZE_STRING),
	's_hpmax' => array('filter'=>FILTER_SANITIZE_STRING)
));
?>