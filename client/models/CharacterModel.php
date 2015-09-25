<?php
class CharacterModel extends ImplicitWOGAPModel {
	public $table = 'wog_character';
}

CharacterModel::setParams(array(
	'ch_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ch_name' => array('filter'=>FILTER_SANITIZE_STRING),
	'ch_str' => array('filter'=>FILTER_SANITIZE_STRING),
	'ch_agi' => array('filter'=>FILTER_SANITIZE_STRING),
	'ch_life' => array('filter'=>FILTER_SANITIZE_STRING),
	'ch_vit' => array('filter'=>FILTER_SANITIZE_STRING),
	'ch_smart' => array('filter'=>FILTER_SANITIZE_STRING),
	'ch_mlv' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ch_map' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ch_au' => array('filter'=>FILTER_SANITIZE_STRING),
	'ch_be' => array('filter'=>FILTER_SANITIZE_STRING),
	'ch_main' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>