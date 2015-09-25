<?php
class ItemModel extends ImplicitWOGAPModel {
	public $table = 'wog_df';
}

ItemModel::setParams(array(
	'd_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_df' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_mdf' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_mstr' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_magl' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_msmart' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_mau' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ch_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_money' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_name' => array('filter'=>FILTER_SANITIZE_STRING),
	'd_type' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_fie' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_at' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_mat' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_dbst' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_g_hp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_g_sp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_g_str' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_g_smart' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_g_agi' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_g_life' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_g_vit' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_g_au' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_g_be' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_s' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_hole' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_plus' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_lv' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'stime' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ch_pro' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_send' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_vip' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>