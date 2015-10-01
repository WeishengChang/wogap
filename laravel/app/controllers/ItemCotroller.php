<?php
require_once 'EditorController.php';
class ItemController extends EditorController {
	public $rules = [
		'id' => 'numeric',
		'p_id' => 'required|numeric',
		'f_id' => 'required|numeric'
	];
	
	public $dbname = 'DBWOGItem';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_df AS d')
					->leftJoin('wog_character AS ch', 'd.ch_id', '=', 'ch.ch_id')
					->leftJoin('wog_ch_skill AS sk', 'd.skill', '=', 'sk.s_id')
					->orderBy('pf.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['d.*', 'ch.ch_name', 'sk.s_name']),
		];
		return Response::json($list);
	}
}
