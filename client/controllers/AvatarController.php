<?php
class AvatarController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = $this->getID("i_id");
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
			$qlimit[] = 'a.i_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.i_id, a.i_filename',
				'SQL_FROM' => 'wog_img a',
				//'sanitize' => array('ItemSynController', 'sanitizeShowData'),
				//'idName' => 'id'
		));
	}
}
