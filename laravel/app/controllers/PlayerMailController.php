<?php
require_once 'EditorController.php';
class PlayerMailController extends EditorController {
	public $rules = [
		'id' => 'numeric',
		'p_id' => 'required|numeric',
		'p_name' => 'string',
		'm_subject' => 'required|string',
		'm_body' => 'required|string',
		'm_read' => 'numeric',
		'm_time' => 'numeric',
	];
	
	public $dbname = 'DBWOGPlayerMail';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_message_box AS pa')
					->leftJoin('wog_player AS p', 'pa.p_id', '=', 'p.p_id')
					->orderBy('pa.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['pa.*', 'p.p_name AS to_name']),
		];
		return Response::json($list);
	}
}
