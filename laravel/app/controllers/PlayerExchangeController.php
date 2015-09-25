<?php
require_once 'EditorController.php';
class PlayerExchangeController extends EditorController {
	public $rules = [
			'el_id' => '',
			'p_id' => 'required',
			'ex_id' => 'string',
			'el_amount' => 'string',
			'el_money' => 'string'
	];
	public $dbname = 'DBWOGPlayerExchange';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_exchange_list AS list')
					->leftJoin('wog_player AS p', 'list.p_id', '=', 'p.p_id')
					->leftJoin('wog_exchange_main AS ex', 'list.ex_id', '=', 'ex.ex_id')
					->orderBy('list.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['list.*', 'p.p_name', 'ex.ex_name']),
		];
		return Response::json($list);
	}
}
