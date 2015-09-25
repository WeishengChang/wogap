<?php
class ItemUsedModel extends ImplicitWOGAPModel {
	public $table = 'wog_df_used';
}

ItemUsedModel::setParams(array(
	'd_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_lv' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_type' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_g_exp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_g_bag' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ch_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'use_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
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