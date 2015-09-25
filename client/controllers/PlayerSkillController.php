<?php
class PlayerSkillController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = $this->getID("p_id,s_id");
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
			$id = $this->parseDataInFormat($id, 'p_id,s_id');
			$qlimit[] = 'a.p_id='.$id['p_id'].' AND a.s_id='.$id['s_id'];
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.p_id, b.p_name, a.s_id, c.s_name, a.main_sid, d.s_name AS main_name, a.s_lv',
				'SQL_FROM' => 'wog_skill_book a LEFT JOIN wog_player b ON b.p_id=a.p_id LEFT JOIN wog_ch_skill c ON c.s_id=a.s_id LEFT JOIN wog_ch_skill d ON d.s_id=a.main_sid',
				'sanitize' => array('PlayerSkillController', 'sanitizeShowData'),
				'idName' => 'id'
		));
	}
	
	public function sanitizeShowData(&$data) {
		$data['id'] = $data['p_id'].','.$data['s_id'];
	}
	
}
