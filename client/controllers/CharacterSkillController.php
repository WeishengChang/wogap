<?php
class CharacterSkillController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = $this->getID("s_id");
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
			$qlimit[] = 'a.s_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.s_id, a.s_name, a.ch_id, b.ch_name, a.s_text, a.ch_exp, a.type, a.stime, a.s_sp, a.s_st, a.s_count, a.s_money, a.s_lv, a.main_sid, c.s_name AS main_name, a.need_sid, d.s_name AS need_name, a.s_master, d.s_lv AS need_slv',
				'SQL_FROM' => 'wog_ch_skill a LEFT JOIN wog_character b ON b.ch_id=a.ch_id LEFT JOIN wog_ch_skill c ON (c.main_sid=a.main_sid AND c.need_sid=0) LEFT JOIN wog_ch_skill d ON d.s_id=a.need_sid',
				'sanitize' => array('CharacterSkillController', 'sanitizeShowData'),
				//'idName' => 'id'
		));
	}
	public static function sanitizeShowData($d) {
		if(is_null($d['main_sid'])) {
			$d['main_name'] = '無';
		}
		if($d['need_sid'] == 0) {
			$d['need_name'] = '無';
		} else {
			$d['need_name'] .= 'LV'.$d['need_slv'];
		}
		unset($d['need_slv']);
		return $d;
	}
}
