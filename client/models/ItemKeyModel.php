<?php
class ItemKeyModel extends ImplicitWOGAPModel {
	public $table = 'wog_key_main';
}

ItemKeyModel::setParams(array(
	'd_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'area_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'area_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>