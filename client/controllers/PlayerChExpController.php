<?php
class PlayerChExpController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = $this->getID("p_id");
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
			//$id = $this->parseDataInFormat($id, 'p_id,area_id');
			$qlimit[] = 'a.p_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.p_id, b.p_name, a.ch_6, a.ch_7, a.ch_8, a.ch_9, a.ch_10, a.ch_11, a.ch_12, a.ch_13, a.ch_14, a.ch_15, a.ch_16, a.ch_17, a.ch_18, a.ch_19, a.ch_20, a.ch_21, a.ch_22, a.ch_23, a.ch_24, a.ch_25, a.ch_26, a.ch_27, a.ch_28, a.ch_29, a.ch_30, a.ch_31, a.ch_32, a.ch_33, a.ch_34, a.ch_25, a.ch_36, a.ch_37, a.ch_38, a.sk_6, a.sk_7, a.sk_8, a.sk_9, a.sk_10, a.sk_11, a.sk_12, a.sk_13, a.sk_14, a.sk_15, a.sk_16, a.sk_17',
				'SQL_FROM' => 'wog_ch_exp a LEFT JOIN wog_player b ON b.p_id=a.p_id'
		));
	}
	
}
