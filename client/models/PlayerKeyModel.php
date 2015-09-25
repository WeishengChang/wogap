<?php
class PlayerKeyModel extends ImplicitWOGAPModel {
	public $table = 'wog_key_list';
}

PlayerKeyModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'area_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'area_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>