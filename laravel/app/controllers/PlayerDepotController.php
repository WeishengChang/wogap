<?php
require_once 'EditorController.php';
class PlayerDepotController extends EditorController {
	public $rules = [
			'p_id' => 'required',
			'd_id' => 'string',
			'd_type' => 'string',
			'd_num' => 'string',
			'hs_id' => 'string',
			'ps_id' => 'string'
	];
	public $dbname = 'DBWOGPlayerDepot';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_player_depot AS depot')
					->leftJoin('wog_player AS p', 'depot.p_id', '=', 'p.p_id')
					->leftJoin('wog_df AS item', 'depot.d_id', '=', 'item.d_id')
					->orderBy('depot.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['depot.*', 'p.p_name', 'item.d_name']),
		];
		return Response::json($list);
	}
}
