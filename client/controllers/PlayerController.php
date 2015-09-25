<?php
class PlayerController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = $this->getID('p_id');
		$this->dispatchOperation($this->getModelName(), $id);
		return true;
	}
	public function show() {
		//取得頁數資訊
		//控制參數
		$qlimit = array();
		$modelName = $this->getModelName();
		$model = new $modelName();
		$searchSQL = self::getJQGridSearchParams();
		//echo($searchSQL);
		$type = filter_input(INPUT_GET, 'type', FILTER_SANITIZE_STRING);
		switch($type) {
			case 'npc':
				$qlimit[] = 'p_npc=1';
				break;
			case 'pc':
				$qlimit[] = 'p_npc=0';
				break;
			case 'nolock':
				$qlimit[] = 'p_lock=0 AND p_npc=0';
				break;
			case 'lock':
				$qlimit[] = 'p_lock=1 AND p_npc=0';
				break;
			case 'cp':
				$qlimit[] = 'p_id in (SELECT p_id FROM wog_player_cp)';
				break;
		}
		$id = filter_input(INPUT_GET, 'row_id', FILTER_SANITIZE_NUMBER_INT);
		if($id) {
			//$id = $this->parseDataInFormat($id, 'p_id,area_id');
			$qlimit[] = 'id='.$id['id'];
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'p_id, p_name, p_password, p_email, p_ipadd, p_act_time, 
					act_num, act_num_time, p_lock_time, p_st, p_userlv, p_lock, p_npc,
					s_property, hp, hpmax, sp, spmax, ch_id, p_money, p_bank, p_cash,
					str, smart, agi, life, vit, au, be,
					base_str, base_smart, base_agi, base_life, base_vit, base_au, base_be,
					at, df, mat, mdf, 
					p_exp, p_nextexp, p_lv, p_birth, p_place,
					p_sat_name, p_win, p_lost, p_sex, p_img_set, p_img_url, 
					p_pk_s, p_pk_money, p_bag, p_depot, p_cp_st, p_cp_time,
					i_img, p_g_id, t_id, p_support, p_recomm, p_attempts,
					p_cdate, p_online_time, p_bbsid',
				'SQL_FROM' => 'wog_player'
		));
	}
}
