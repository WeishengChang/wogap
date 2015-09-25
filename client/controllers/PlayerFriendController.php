<?php
class PlayerFriendController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
		$ids = explode(',', $id);
		$pks = array('p_id' => $ids[0], 'f_id'=>$ids[1]);
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
			$ids = explode(',', $id);
			switch(count($ids)) {
				case 1: $qlimit[] = 'a.p_id='.$ids[0]; break;
				case 2: $qlimit[] = 'a.p_id='.$ids[0].' AND a.f_id='.$ids[1]; break;
			}
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.p_id, b.p_name, a.f_id, c.p_name AS f_name',
				'SQL_FROM' => 'wog_friend_list a LEFT JOIN wog_player b ON b.p_id=a.p_id LEFT JOIN wog_player c ON c.p_id=a.f_id',
				'sanitize' => array('PlayerFirendController', 'sanitizeShowData'),
				'idName' => 'id'
		));
	}
	
	public static final function sanitizeShowData(&$data) {
		$data['id'] = $data['p_id'].','.$data['f_id'];
		return $data;
	}
}
