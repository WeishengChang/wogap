<?php
require_once 'EditorController.php';
class PlayerBuffController extends EditorController {
	public $rules = [
		'p_id' => 'required|numeric',
		'end_time' => 'numeric',
		'exp' => 'numeric',
		'skill_exp' => 'numeric',
		'at' => 'numeric',
		'mat' => 'numeric',
		'df' => 'numeric',
		'mdf' => 'numeric',
		'hp' => 'numeric',
		'sp' => 'numeric',
	];
	
	public function afterValidation(&$data) {
		
	}
	public $dbname = 'DBWOGPlayerBuff';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_player_buffer AS pb')
					->leftJoin('wog_player AS p', 'pb.p_id', '=', 'p.p_id')
					->orderBy('pb.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['pb.*', 'p.p_name']),
		];
		return Response::json($list);
	}
}
