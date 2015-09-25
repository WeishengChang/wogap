<?php
class PlayerHeroModel extends ImplicitWOGAPModel {
	public $table = 'wog_player_cp';
}

PlayerHeroModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_cp_st' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'hero_npc' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'hero_type' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'hero_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>