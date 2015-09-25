<?php
class MonsterModel extends ImplicitWOGAPModel {
	public $table = 'wog_monster';
}

MonsterModel::setParams(array(
	'm_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'm_name' => array('filter'=>FILTER_SANITIZE_STRING),
	'm_sat_name' => array('filter'=>FILTER_SANITIZE_STRING),
	's_property' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'm_img' => array('filter'=>FILTER_SANITIZE_STRING),
	'm_place' => array('filter'=>FILTER_SANITIZE_STRING),
	'm_subplace' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'm_lv' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'm_meet' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'm_mission' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'm_npc' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'm_npc_message' => array('filter'=>FILTER_SANITIZE_STRING),
	'hp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'sp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'at' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'df' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'mat' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'mdf' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'str' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'smart' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'agi' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'life' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'au' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'be' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_1' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_2' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_3' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_4' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_5' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'time_1' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'time_2' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'time_3' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'm_job_exp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_id' => array('filter'=>FILTER_SANITIZE_STRING),
	'm_topr' => array('filter'=>FILTER_SANITIZE_STRING)
));
?>