<?php
require_once 'EditorController.php';
class ExchangeLogController extends EditorController {
	public $rules = [
		'eb_id' => '',
		'ex_id' => 'numeric',
		'eb_body' => 'string',
		'eb_time' => 'numeric',
	];
	
	public $dbname = 'DBWOGExchangeLog';
	public function afterValidation(&$data) {
        
        $ex = DBWOGExchangeLog::find($data['eb_id']);
        if ($data['pkval'] && $ex && $data['pkval']!=$data['eb_id']) {
            Response::alert("ID重複");
        }
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_exchange_book';
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
                    ->leftJoin('wog_exchange_main AS ex', $alias.'.ex_id', '=', 'ex.ex_id')
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get([$alias.'.*', 'ex.ex_name']),
		];
		return Response::json($list);
	}
}
