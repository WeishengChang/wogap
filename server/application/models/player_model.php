<?php

class Player_model extends CI_model {
	public function __construct() {
		parent::__construct();
		$this->load->database();
	}
	
	public function getList($params) {
		$list = ['total'=>0, 'rows'=>[]];
		$query = $this->db->query("
			SELECT *
			FROM wog_player
		");
		$list['total'] = $query->num_rows();
		$sqlOrder = $params['sort'] ? "ORDER BY {$params['sort']} {$params['order']}" : '' ;
		$query = $this->db->query("
			SELECT *
			FROM wog_player
			".$sqlOrder."
			LIMIT ".($params['page']-1)*$params['rows'].", ".$params['rows']."
		");
		foreach($query->result_array() as $row) {
			$list['rows'][] = $row;
		}
		return $list;
	}
	
	public function update($d) {
		error_reporting( error_reporting() & ~E_NOTICE ); //supressing notice message
		$query = $this->db->query("
			REPLACE INTO wog_player
			(p_id, p_name, p_password, p_email, p_ipadd, p_act_time, act_num,
			act_num_time, p_lock_time, p_st, p_userlv, p_lock, p_npc, s_property,
			hp, hpmax, sp, spmax, ch_id, p_money, p_bank, p_cash, str, smart, 
			agi, life, vit, au, be, base_str, base_smart, base_agi, base_life,
			base_vit, base_au, base_be, at, df, mat, mdf, p_exp, p_nextexp, 
			p_lv, p_birth, p_place, p_sat_name, p_win, p_lost, p_sex, p_img_set, 
			p_img_url, p_pk_s, p_pk_money, p_bag, p_depot, p_cp_st, p_cp_time, 
			i_img, p_g_id, t_id, p_support, p_recomm, p_attempts, p_cdate,
			p_online_time, p_bbsid)
			VALUES
			('{$d['p_id']}', '{$d['p_name']}', '{$d['p_password']}', '{$d['p_email']}', '{$d['p_ipadd']}', '{$d['p_act_time']}', '{$d['act_num']}', 
			'{$d['act_num_time']}', '{$d['p_lock_time']}', '{$d['p_st']}', '{$d['p_userlv']}', '{$d['p_lock']}', '{$d['p_npc']}', '{$d['s_property']}',
			'{$d['hp']}', '{$d['hpmax']}', '{$d['sp']}', '{$d['spmax']}', '{$d['ch_id']}', '{$d['p_money']}', '{$d['p_bank']}', '{$d['p_cash']}', '{$d['str']}', '{$d['smart']}', 
			'{$d['agi']}', '{$d['life']}', '{$d['vit']}', '{$d['au']}', '{$d['be']}', '{$d['base_str']}', '{$d['base_smart']}', '{$d['base_agi']}', '{$d['base_life']}',
			'{$d['base_vit']}', '{$d['base_au']}', '{$d['base_be']}', '{$d['at']}', '{$d['df']}', '{$d['mat']}', '{$d['mdf']}', '{$d['p_exp']}', '{$d['p_nextexp']}', 
			'{$d['p_lv']}', '{$d['p_birth']}', '{$d['p_place']}', '{$d['p_sat_name']}', '{$d['p_win']}', '{$d['p_lost']}', '{$d['p_sex']}', '{$d['p_img_set']}', 
			'{$d['p_img_url']}', '{$d['p_pk_s']}', '{$d['p_pk_money']}', '{$d['p_bag']}', '{$d['p_depot']}', '{$d['p_cp_st']}', '{$d['p_cp_time']}', 
			'{$d['i_img']}', '{$d['p_g_id']}', '{$d['t_id']}', '{$d['p_support']}', '{$d['p_recomm']}', '{$d['p_attempts']}', '{$d['p_cdate']}',
			'{$d['p_online_time']}', '{$d['p_bbsid']}')
		");
		error_reporting( error_reporting() & E_NOTICE );
	}
}