<?php
class PlayerBuffController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
		$pks = array('p_id' => $id);
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
			$qlimit[] = 'a.p_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.p_id, b.p_name, a.end_time, a.exp, a.skill_exp, a.at, a.mat, a.df, a.mdf, a.hp, a.sp',
				'SQL_FROM' => 'wog_player_buffer a LEFT JOIN wog_player b ON b.p_id=a.p_id'
		));
	}
}
