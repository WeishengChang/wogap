<?php
class PlayerMessageController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
		$pks = array('m_id' => $id);
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
			$qlimit[] = 'a.m_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.m_id, a.p_id, b.p_name, a.title, a.from_pid, c.p_name AS from_name, a.dateline',
				'SQL_FROM' => 'wog_message a LEFT JOIN wog_player b ON b.p_id=a.p_id LEFT JOIN wog_player c ON c.p_id=a.from_pid'
		));
	}
}
