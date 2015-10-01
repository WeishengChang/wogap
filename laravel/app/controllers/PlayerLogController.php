<?php
require_once 'EditorController.php';
class PlayerLogController extends EditorController {
	public $rules = [
		'id' => 'numeric',
		'p_id' => 'required|numeric',
		'd_id' => 'required|numeric',
		'num' => 'required|numeric',
		'type' => 'required|numeric',
		'datetime' => 'required|numeric',
	];
	
	public function afterValidation(&$data) {
		
	}
	public $dbname = 'DBWOGPlayerLog';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_vip_log AS pl')
					->leftJoin('wog_player AS p', 'pl.p_id', '=', 'p.p_id')
					->leftJoin('wog_df AS d', 'pl.d_id', '=', 'd.d_id')
					->orderBy('pl.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['pl.*', 'p.p_name', 'd.d_name']),
		];
		return Response::json($list);
	}
}
