<?php
require_once 'EditorController.php';
class PlayerFriendController extends EditorController {
	public $rules = [
		'id' => 'numeric',
		'p_id' => 'required|numeric',
		'f_id' => 'required|numeric'
	];
	
	public $dbname = 'DBWOGPlayerFriend';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_friend_list AS pf')
					->leftJoin('wog_player AS p', 'pf.p_id', '=', 'p.p_id')
					->leftJoin('wog_player AS f', 'pf.f_id', '=', 'f.p_id')
					->orderBy('pf.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['pf.*', 'p.p_name', 'f.p_name AS f_name']),
		];
		return Response::json($list);
	}
}
