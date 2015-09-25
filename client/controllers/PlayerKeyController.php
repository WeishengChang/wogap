<?php
class PlayerKeyController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = $this->getID("p_id,area_id");
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
			$id = $this->parseDataInFormat($id, 'p_id,area_id');
			$qlimit[] = 'a.p_id='.$id['p_id'].' AND a.area_id='.$id['area_id'];
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.p_id, b.p_name, a.area_id, a.area_id AS area_name, a.area_time',
				'SQL_FROM' => 'wog_key_list a LEFT JOIN wog_player b ON b.p_id=a.p_id',
				'sanitize' => array('PlayerKeyController', 'sanitizeShowData'),
				'idName' => 'id'
		));
	}
	
	public static function sanitizeShowData($d) {
		$d['id'] = $d['p_id'].','.$d['area_id'];
		return $d;
	}
	
}
