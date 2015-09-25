<?php
class CharacterController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$id = $this->getID("ch_id");
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
			$qlimit[] = 'a.ch_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.ch_id, a.ch_name, a.ch_str, a.ch_smart, a.ch_agi, a.ch_life, a.ch_vit, a.ch_au, a.ch_be, a.ch_mlv, a.ch_map, a.ch_main, b.ch_name AS main_name',
				'SQL_FROM' => 'wog_character a LEFT JOIN wog_character b ON b.ch_id=a.ch_main',
				'sanitize' => array('CharacterController', 'sanitizeShowData'),
				//'idName' => 'id'
		));
	}
	public static function sanitizeShowData($d) {
		if(!$d['ch_main'] == 0) {
			$d['main_name'] = '無';
		}
		return $d;
	}
}
