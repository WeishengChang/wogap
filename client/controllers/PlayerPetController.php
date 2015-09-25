<?php
class PlayerPetController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		$modelName = $this->getModelName();
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
		$pks = array('pe_id' => $id);
		$this->dispatchOperation($this->getModelName(), $pks);
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
			$qlimit[] = 'a.pe_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.pe_id, a.pe_p_id, b.p_name, a.pe_name, a.pe_mname, a.pe_at, 
					a.pe_mt, a.pe_fu, a.pe_def, a.pe_hu, a.pe_type, a.pe_age, 
					a.pe_he, a.pe_fi, a.pe_dateline, a.pe_m_id, a.pe_st, 
					a.pe_money, a.pe_s_dateline, a.pe_b_dateline, a.pe_f_dateline, 
					a.pe_b_old, a.pe_mimg, a.pe_img_url, a.pe_img_set,
					a.p_send',
				'SQL_FROM' => 'wog_pet a LEFT JOIN wog_player b ON b.p_id=a.pe_p_id'
		));
	}
}
