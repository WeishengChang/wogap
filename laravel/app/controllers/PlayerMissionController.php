<?php
require_once 'EditorController.php';
class PlayerMissionController extends EditorController {
	public $rules = [
			'id' => '',
			'm_id' => 'required|numeric',
			'p_id' => 'required|numeric',
			'm_status' => 'numeric',
			'm_kill_num' => 'numeric'
			
	];
	public $dbname = 'DBWOGPlayerMission';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_mission_book AS mb')
					->leftJoin('wog_player AS p', 'mb.p_id', '=', 'p.p_id')
					->leftJoin('wog_mission_main AS ma', 'mb.m_id', '=', 'ma.m_id')
					->orderBy('mb.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['mb.*', 'p.p_name', DB::raw('CONCAT(ma.m_name, " - ", ma.m_subject) AS m_name')]),
		];
		return Response::json($list);
	}
}
