<?php
class CharacterSkillModel extends ImplicitWOGAPModel {
	public $table = 'wog_ch_skill';
}

CharacterSkillModel::setParams(array(
	's_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ch_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ch_exp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'type' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'stime' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_name' => array('filter'=>FILTER_SANITIZE_STRING),
	's_sp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_st' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_count' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_text' => array('filter'=>FILTER_SANITIZE_STRING),
	's_money' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_lv' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'main_sid' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'need_sid' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_master' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>