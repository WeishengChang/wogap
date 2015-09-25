<?php
class ItemSaleController extends Controller {
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
				'SQL_SELECT' => 'a.s_id, a.p_id, b.p_name, a.d_id, c.d_name, a.d_type, a.hs_id, a.ps_id, a.item_num, a.s_money, a.s_type, a.e_money, a.e_p_id, d.p_name AS e_p_name, a.dateline',
				'SQL_FROM' => 'wog_sale a LEFT JOIN wog_player b ON b.p_id=a.p_id LEFT JOIN wog_df c ON c.d_id=a.d_id LEFT JOIN wog_player d ON d.p_id=a.e_p_id',
				'sanitize' => array('ItemSaleController', 'sanitizeShowData'),
				//'idName' => 'id'
		));
	}
	public static function sanitizeShowData($d) {
		if(in_array($d['d_type'], array(5, 6))) {
			$d['d_name'] .= '*'.$d['item_num'];
		}
		return $d;
	}
}
