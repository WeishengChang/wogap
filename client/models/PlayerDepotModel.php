<?php
class PlayerDepotModel extends ImplicitWOGAPModel {
	public $table = 'wog_player_depot';
}

PlayerDepotModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_type' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'd_num' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'hs_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ps_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>