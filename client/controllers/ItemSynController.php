<?php
class ItemSynController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = $this->getID("syn_id");
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
			$qlimit[] = 'a.syn_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.syn_id, a.syn_result, b.d_name, a.syn_element, "" AS syn_name, a.syn_topr, a.syn_num, a.syn_mission, a.syn_need_mission, c.m_subject, b.d_type',
				'SQL_FROM' => 'wog_syn a LEFT JOIN wog_df b ON b.d_id=a.syn_result LEFT JOIN wog_mission_main c ON c.m_id=a.syn_need_mission',
				'sanitize' => array('ItemSynController', 'sanitizeShowData'),
				//'idName' => 'id'
		));
	}
	public static function sanitizeShowData($d) {
		if($d['syn_need_mission'] == 0) {
			$d['m_subject'] = '無';
		}
		if(in_array($d['d_type'], array(5, 6))) {
			$d['d_name'] .= '*'.$d['syn_num'];
		}
		$tmplist = explode(',', $d['syn_element']);
		$itemlist = $listmap = [];
		$listmap = [];
		$result = array();
		foreach($tmplist as $v) {
			$v = explode('*', $v);
			$itemlist[] = $v[0];
			$listmap[$v[0]] = $v[1];
		}
		$query = DBC::query('
			SELECT d_id, d_name
			FROM wog_df
			WHERE d_id IN ('.implode(',', $itemlist).')
		');
		while($item = $query->fetchAssoc()) {
			$result[] = $item['d_name'].'*'.$listmap[$item['d_id']];
		}
		$d['syn_name'] = implode(', ', $result);
		unset($d['d_type']);
		return $d;
	}
}
