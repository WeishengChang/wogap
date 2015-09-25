<?php
class PlayerEquipmentController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
		$pks = array('p_id' => $id);
		$this->dispatchOperation($this->getModelName(), $pks);
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
			$qlimit[] = 'a.p_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.p_id, b.p_name, a.a_id, c.d_name AS a_name,
					a.d_body_id, d.d_name AS body_name,
					a.d_head_id, e.d_name AS head_name,
					a.d_hand_id, f.d_name AS hand_name,
					a.d_foot_id, g.d_name AS foot_name,
					a.d_item_id, h.d_name AS item_name,
					a.d_item_id2, i.d_name AS item_name2,
					a.s_a_id, a.s_body_id, a.s_head_id, a.s_hand_id, a.s_foot_id,
					a.s_item_id, 
					a.p_a_id, a.p_body_id, a.p_head_id, a.p_hand_id, a.p_foot_id, 
					a.p_item_id, a.d_item_num, a.d_item_num2',
				'SQL_FROM' => 'wog_player_arm a
					LEFT JOIN wog_player b ON b.p_id=a.p_id
					LEFT JOIN wog_df c ON c.d_id=a.a_id
					LEFT JOIN wog_df d ON d.d_id=a.d_body_id
					LEFT JOIN wog_df e ON e.d_id=a.d_head_id
					LEFT JOIN wog_df f ON f.d_id=a.d_hand_id
					LEFT JOIN wog_df g ON g.d_id=a.d_foot_id
					LEFT JOIN wog_df h ON h.d_id=a.d_item_id
					LEFT JOIN wog_df i ON i.d_id=a.d_item_id2',
				'SQL_ORDERBY' => array('PlayerEquipmentController', 'OrderBySwitch'),
				'sanitize' => array('PlayerEquipmentController', 'sanitizeShowData')
		));
	}
	public static final function OrderBySwitch($sidx, $sord) {
		switch($sidx) {
			case 'p_name': $olimit = "b.{$sidx} {$sord}"; break;
			case 'a_name': $olimit = "BY c.d_name {$sord}"; break;
			case 'body_name': $olimit = "BY d.d_name {$sord}"; break;
			case 'head_name': $olimit = "e.d_name {$sord}"; break;
			case 'hand_name': $olimit = "f.d_name {$sord}"; break;
			case 'foot_name': $olimit = "g.d_name {$sord}"; break;
			case 'item_name': $olimit = "h.d_name {$sord}"; break;
			case 'item_name2': $olimit = "i.d_name {$sord}"; break;
			default: $olimit = "a.{$sidx} {$sord} " ; break;
		}
		return $olimit;
	}
	
	public static final function sanitizeShowData($data) {
		foreach(array('a_name', 'body_name', 'head_name', 'hand_name', 'foot_name') as $v) {
			if(empty(trim($data[$v]))) {
				$data[$v] = '無';
			}
		}
		foreach(array(array('item_name', 'd_item_num'), array('item_name2', 'd_item_num2')) as $v) {
			if(empty(trim($data[$v[0]]))) {
				$data[$v[0]] = '無';
			} else {
				$data[$v[0]] .= '*'.$d[$v[1]];
			}
		}
		return $data;
	}
}
