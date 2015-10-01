<?php
require_once 'EditorController.php';
class PlayerMessageController extends EditorController {
	public $rules = [
		'm_id' => '',
		'p_id' => 'required|numeric',
		'title' => 'required|string',
		'from_pid' => 'numeric',
		'dateline' => 'numeric'
	];
	
	public function afterValidation(&$data) {
		
	}
	public $dbname = 'DBWOGPlayerMessage';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_message AS pm')
					->leftJoin('wog_player AS p', 'pm.p_id', '=', 'p.p_id')
					->leftJoin('wog_player AS fp', 'pm.from_pid', '=', 'fp.p_id')
					->orderBy('pm.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['pm.*', 'p.p_name', 'fp.p_name AS from_name']),
		];
		return Response::json($list);
	}
}
