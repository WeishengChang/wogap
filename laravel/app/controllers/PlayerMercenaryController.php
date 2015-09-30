<?php
require_once 'EditorController.php';
class PlayerMercenaryController extends EditorController {
	public $rules = [
		'id' => '',
		'p_id' => 'required|numeric',
		'me_id' => 'required|numeric',
		'me_name' => 'string',
		'me_count' => 'numeric',
		'me_place' => 'numeric',
		'me_fight_time' => 'numeric'
	];
	
	public function afterValidation(&$data) {
		
	}
	public $dbname = 'DBWOGPlayerMercenary';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_mercenary_list AS pm')
					->leftJoin('wog_player AS p', 'pm.p_id', '=', 'p.p_id')
					->leftJoin('wog_mercenary_main AS m', 'pm.me_id', '=', 'm.me_id')
					->orderBy('pm.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['pm.*', 'p.p_name', 'm.me_name AS me_name_raw']),
		];
		return Response::json($list);
	}
}
