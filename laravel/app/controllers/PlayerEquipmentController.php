<?php
require_once 'EditorController.php';
class PlayerEquipmentController extends EditorController {
	public $rules = [
			'p_id' => 'required',
			'a_id' => 'string',
			'd_head_id' => 'string',
			'd_body_id' => 'string',
			'd_hand_id' => 'string',
			'd_foot_id' => 'string',
			'd_item_id' => 'string',
			'd_key_id' => 'string',
			'd_honor_id' => 'string',
			'd_stone_id' => 'string',
			'd_plus_id' => 'string',
	];
	public $dbname = 'DBWOGPlayerEquipment';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_player_arm AS arm')
					->leftJoin('wog_player AS p', 'arm.p_id', '=', 'p.p_id')
					->leftJoin('wog_df AS a', 'arm.a_id', '=', 'a.d_id')
					->leftJoin('wog_df AS b', 'arm.d_body_id', '=', 'b.d_id')
					->leftJoin('wog_df AS c', 'arm.d_head_id', '=', 'c.d_id')
					->leftJoin('wog_df AS d', 'arm.d_hand_id', '=', 'd.d_id')
					->leftJoin('wog_df AS e', 'arm.d_foot_id', '=', 'e.d_id')
					->leftJoin('wog_df AS f', 'arm.d_item_id', '=', 'f.d_id')
					->leftJoin('wog_df AS g', 'arm.d_item_id2', '=', 'g.d_id')
					->orderBy('arm.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['arm.*', 'p.p_name', 'a.d_name as a_name', 'b.d_name AS body_name', 'c.d_name AS head_name', 'd.d_name AS hand_name', 'e.d_name AS foot_name', 'f.d_name AS item_name', 'g.d_name AS item2_name']),
		];
		return Response::json($list);
	}
}
