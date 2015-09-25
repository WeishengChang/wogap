<?php
class PlayerSkillSetupController extends Controller {
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
			//$id = $this->parseDataInFormat($id, 'p_id,s_id');
			$qlimit[] = 'a.p_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.p_id, b.p_name, a.skill_1, c.s_name AS name_1, a.skill_2, d.s_name AS name_2, a.skill_3, e.s_name AS name_3, a.skill_4, f.s_name AS name_4, a.skill_5, g.s_name AS name_5, a.time_1, a.time_2, a.time_3, a.time_4, a.time_5',
				'SQL_FROM' => 'wog_skill_setup a LEFT JOIN wog_player b ON b.p_id=a.p_id LEFT JOIN wog_ch_skill c ON c.s_id=a.skill_1 LEFT JOIN wog_ch_skill d ON d.s_id=a.skill_2 LEFT JOIN wog_ch_skill e ON e.s_id=a.skill_3 LEFT JOIN wog_ch_skill f ON f.s_id=a.skill_4 LEFT JOIN wog_ch_skill g ON g.s_id=a.skill_5'
		));
	}
}
