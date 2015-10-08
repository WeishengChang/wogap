<?php
require_once 'EditorController.php';
class PlayerTeamController extends EditorController {
	public $rules = [
		't_id' => '',
		'p_id' => 'numeric',
		't_name' => 'string',
		't_peo' => 'numeric',
		't_time' => 'numeric',
	];
	
	public $dbname = 'DBWOGPlayerTeam';
	public function afterValidation(&$data) {
        $ex = DBWOGPlayerTeam::find($data['t_id']);
        if ($data['pkval'] && $ex && $data['pkval']!=$data['t_id']) {
            Response::alert("ID重複");
        }
        $ex = DBWOGPlayer::find($data['p_id']);
        if (!$ex) {
            Response::alert("玩家(p_id={$data['p_id']})不存在");
        }
        
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_team_main';
		$alias = 'c';
		$prefix = $alias.'.';
		switch($sort) {
			case 'd_name':
				$prefix = 'd.';
				break;
		}
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), $table.' AS '.$alias)
                    ->leftJoin('wog_player AS p', $alias.'.p_id', '=', 'p.p_id')
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get([$alias.'.*', 'p.p_name']),
		];
		return Response::json($list);
	}
}
