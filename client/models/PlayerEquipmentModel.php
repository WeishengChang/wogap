<?php
class PlayerEquipmentModel extends ImplicitWOGAPModel {
	public $table = 'wog_player_arm';
}

PlayerEquipmentModel::setParams(array(
	'a_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_body_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_head_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_hand_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_foot_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_item_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_item_id2' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_a_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_body_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_head_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_hand_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_foot_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_item_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_a_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_body_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_head_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_hand_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_foot_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_item_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_item_num' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_item_num2' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>