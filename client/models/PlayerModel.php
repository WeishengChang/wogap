<?php
class PlayerModel extends ImplicitWOGAPModel {
	public $table = 'wog_player';
	static public final function get($p_id) {
		return new self();
		$p = DBC::queryOneAssoc("SELECT * FROM {self::$tablename} WHERE p_id={$p_id}");
	}
	
	public function validate(&$data, $single = false) {
		$p = DBC::queryOneAssoc('
			SELECT p_id, p_name
			FROM wog_player
			WHERE p_name="'.$data['p_name'].'"
		');
		if($p && (!is_numeric($this->pk['p_id']) || $p['p_id'] != $this->pk['p_id']) ) {
			alert('玩家名稱重複');
		}
		if(!$single) return;
	}
	
	public function sanitize(&$data) {
		$pair = array(
			array('hp', 'hpmax'), 
			array('sp', 'spmax'),
			array('p_exp', 'p_nextexp'),
			array('base_str', 'str'),
			array('base_smart', 'smart'),
			array('base_agi', 'agi'),
			array('base_life', 'life'),
			array('base_vit', 'vit'),
			array('base_au', 'au'),
			array('base_be', 'be'),
		);
		foreach($pair as $item) {
			if($data[$item[0]] > $data[$item[1]]) {
				$data[$item[0]] = $data[$item[1]];
			}
		}
	}
}

PlayerModel::setParams(array(
	'p_name' => array('filter'=>FILTER_SANITIZE_STRING, 'flags'=>FILTER_FLAG_EMPTY_STRING_NULL),
	'p_email' => array('filter'=>FILTER_SANITIZE_EMAIL),
	'act_num' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'act_num_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'at' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'df' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'mat' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'mdf' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	's_property' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_ipadd' => array('filter'=>FILTER_SANITIZE_EMAIL, 'options'=>array('default'=>'0.0.0.0'), 'flags'=>FILTER_FLAG_EMPTY_STRING_NULL),
	'str' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'life' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'vit' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'smart' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'agi' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'hp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'sp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'spmax' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_sat_name' => array('filter'=>FILTER_SANITIZE_STRING),
	'hpmax' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ch_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_money' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_lv' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_exp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_nextexp' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_win' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_lost' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_sex' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_password' => array('filter'=>FILTER_SANITIZE_STRING, 'flags'=>FILTER_FLAG_EMPTY_STRING_NULL),
	'i_img' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_img_url' => array('filter'=>FILTER_SANITIZE_STRING),
	'p_img_set' => array('filter'=>FILTER_VALIDATE_BOOLEAN, 'flags'=>FILTER_NULL_ON_FAILURE),
	'p_act_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_cdate' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_online_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_bbsid' => array('filter'=>FILTER_SANITIZE_STRING),
	'p_pk_s' => array('filter'=>FILTER_VALIDATE_BOOLEAN, 'flags'=>FILTER_NULL_ON_FAILURE),
	'p_pk_money' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_birth' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_place' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'au' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'be' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'base_str' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'base_agi' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'base_life' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'base_vit' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'base_smart' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'base_au' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'base_be' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_bank' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_bag' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_depot' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_lock' => array('filter'=>FILTER_VALIDATE_BOOLEAN, 'flags'=>FILTER_NULL_ON_FAILURE),
	'p_g_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	't_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_support' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_cp_st' => array('filter'=>FILTER_VALIDATE_BOOLEAN, 'flags'=>FILTER_NULL_ON_FAILURE),
	'p_cp_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_cash' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_recomm' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_attempts' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_lock_time' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_st' => array('filter'=>FILTER_VALIDATE_BOOLEAN, 'flags'=>FILTER_NULL_ON_FAILURE),
	'p_userlv' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'p_npc' => array('filter'=>FILTER_VALIDATE_BOOLEAN, 'flags'=>FILTER_NULL_ON_FAILURE)
));
?>