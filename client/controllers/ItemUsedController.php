<?php
class ItemUsedController extends Controller {
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
				'SQL_SELECT' => 'a.d_id, b.d_name, a.d_lv, a.d_lv, a.d_type, a.d_g_exp, a.d_g_bag, a.ch_id, c.ch_name, a.skill_id, d.s_name, a.use_time, a.exp, a.skill_exp, a.at, a.mat, a.df, a.mdf, a.hp, a.sp',
				'SQL_FROM' => 'wog_df_used a LEFT JOIN wog_df b ON b.d_id=a.d_id LEFT JOIN wog_character c ON c.ch_id=a.ch_id LEFT JOIN wog_ch_skill d ON d.s_id=a.skill_id',
				//'sanitize' => array('PlayerMissionController', 'sanitizeShowData'),
				//'idName' => 'id'
		));
	}
}
