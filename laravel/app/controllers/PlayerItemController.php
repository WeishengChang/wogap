<?php
require_once 'EditorController.php';
class PlayerItemController extends EditorController {
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
	public $dbname = 'DBWOGPlayerItem';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'leftJoin'), 'wog_player', 'wog_item.p_id', '=', 'wog_player.p_id')
					->orderBy('wog_item.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['wog_item.*', 'wog_player.p_name']),
		];
		return Response::json($list);
	}
}
