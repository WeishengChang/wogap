<?php
class ItemPlusController extends Controller {
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
				'SQL_SELECT' => 'a.d_id, b.d_name, a.d_lv, a.d_type, a.d_at, a.d_mat, a.d_df, a.d_mdf, a.d_str, a.d_agi, a.d_smart, a.d_life, a.d_vit, a.d_au, a.d_be',
				'SQL_FROM' => 'wog_plus_list a LEFT JOIN wog_df b ON b.d_id=a.d_id',
				//'sanitize' => array('PlayerMissionController', 'sanitizeShowData'),
				//'idName' => 'id'
		));
	}
}
