<?php
class PlayerSkillSetupModel extends ImplicitWOGAPModel {
	public $table = 'wog_skill_setup';
}

PlayerSkillSetupModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_1' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_2' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_3' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_4' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'skill_5' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'time_1' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'time_2' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'time_3' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'time_4' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'time_5' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>