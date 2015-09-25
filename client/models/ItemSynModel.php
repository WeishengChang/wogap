<?php
class ItemSynModel extends ImplicitWOGAPModel {
	public $table = 'wog_syn';
}

ItemSynModel::setParams(array(
	'syn_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'syn_result' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'syn_element' => array('filter'=>FILTER_SANITIZE_STRING),
	'syn_topr' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'syn_num' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'syn_mission' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'syn_need_mission' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>