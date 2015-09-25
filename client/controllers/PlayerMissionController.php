<?php
class PlayerMissionController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = $this->getID("p_id,m_id");
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
			$id = $this->parseDataInFormat($id, 'p_id,m_id');
			$qlimit[] = 'a.p_id='.$id['p_id'].' AND a.m_id='.$id['m_Id'];
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.p_id, b.p_name, a.m_id, c.m_subject, a.m_status, a.m_kill_num',
				'SQL_FROM' => 'wog_mission_book a LEFT JOIN wog_player b ON b.p_id=a.p_id LEFT JOIN wog_mission_main c ON c.m_id=a.m_id',
				'sanitize' => array('PlayerMissionController', 'sanitizeShowData'),
				'idName' => 'id'
		));
	}
	
	public static function sanitizeShowData($d) {
		$d['id'] = $d['p_id'].','.$d['m_id'];
		return $d;
	}
}
