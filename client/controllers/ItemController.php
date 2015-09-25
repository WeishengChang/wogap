<?php
class ItemController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = $this->getID("d_id");
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
		$id = filter_input(INPUT_GET, 'row_id', FILTER_SANITIZE_NUMBER_INT);
		if($id) {
			//$id = $this->parseDataInFormat($id, 'd_id');
			$qlimit[] = 'a.d_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.d_id, a.d_name, a.d_money, a.d_type, a.d_fie, a.d_dbst, a.d_hole, a.d_plus, a.d_lv, a.d_send, a.d_vip, a.d_mstr, a.d_msmart, a.d_magl, a.d_mau, a.d_at, a.d_df, a.d_mat, a.d_mdf, a.d_g_hp, a.d_g_sp, a.d_g_str, a.d_g_str, a.d_g_smart, a.d_g_agi, a.d_g_life, a.d_g_vit, a.d_g_au, a.d_g_be, a.ch_id, b.ch_name, a.d_s, a.skill, a.stime, a.ch_pro',
				'SQL_FROM' => 'wog_df a LEFT JOIN wog_character b ON b.ch_id=a.ch_id',
				//'sanitize' => array('PlayerMissionController', 'sanitizeShowData'),
				//'idName' => 'id'
		));
	}
}
