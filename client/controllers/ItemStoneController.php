<?php
class ItemStoneController extends Controller {
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
				'SQL_SELECT' => 'a.d_id, b.d_name, a.d_lv, a.d_class, a.s_at, a.s_mat, a.s_df, a.s_mdf, a.s_agl, a.s_str, a.s_life, a.s_vit, a.s_smart, a.s_au, a.s_be, a.s_hpmax',
				'SQL_FROM' => 'wog_stone_list a LEFT JOIN wog_df b ON b.d_id=a.d_id',
				//'sanitize' => array('PlayerMissionController', 'sanitizeShowData'),
				//'idName' => 'id'
		));
	}
}
