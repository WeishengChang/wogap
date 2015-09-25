<?php
class PlayerPetModel extends ImplicitWOGAPModel {
	public $table = 'wog_pet';
	
	static public final function getAge($birthDateline) {
		if(file_exists(WOG_PATH.'/wog_act_config.php')) {
			include(WOG_PATH.'/wog_act_config.php');
			return round((time()-$birthDateline)/$wog_arry['pet_age']);
		}
		return 0;
	}
}

PlayerPetModel::setParams(array(
	'pe_p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_name' => array('filter'=>FILTER_SANITIZE_STRING),
	'pe_at' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_mt' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_fu' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_def' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_hu' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_type' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_age' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_he' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_fi' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_dateline' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_m_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_st' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_money' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_s_dateline' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_b_dateline' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_f_dateline' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_b_old' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'pe_mimg' => array('filter'=>FILTER_SANITIZE_STRING),
	'pe_img_url' => array('filter'=>FILTER_SANITIZE_STRING),
	'pe_img_set' => array('filter'=>FILTER_VALIDATE_BOOLEAN, 'flags'=>FILTER_NULL_ON_FAILURE),
	'p_send' => array('filter'=>FILTER_VALIDATE_BOOLEAN, 'flags'=>FILTER_NULL_ON_FAILURE)
));
?>