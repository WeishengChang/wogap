<?php
require_once 'EditorController.php';
class ExchangeController extends EditorController {
	public $rules = [
		'ex_id' => '',
		'ex_name' => 'string',
		'ex_money' => 'numeric',
		'ex_amount' => 'numeric',
		'ex_change' => 'numeric',
		'ex_chg_num' => 'numeric',
		'ex_change_time' => 'numeric',
		'ex_resupply_time' => 'numeric',
	];
	
	public $dbname = 'DBWOGExchange';
	public function afterValidation(&$data) {
        
        $ex = DBWOGExchange::find($data['ex_id']);
        if ($data['pkval'] && $ex && $data['pkval']!=$data['ex_id']) {
            Response::alert("ID重複");
        }
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_exchange_main';
		$alias = 'ds';
		$prefix = $alias.'.';
		switch($sort) {
			case 'd_name':
				$prefix = 'd.';
				break;
		}
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), $table.' AS '.$alias)
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get([$alias.'.*']),
		];
		return Response::json($list);
	}
}
