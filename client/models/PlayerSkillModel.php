<?php
class PlayerSkillModel extends ImplicitWOGAPModel {
	public $table = 'wog_skill_book';
}

PlayerSkillModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'main_sid' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_lv' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>