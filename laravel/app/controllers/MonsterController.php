<?php
require_once 'EditorController.php';
class MonsterController extends EditorController {
	public $rules = [
		'm_id' => '',
		'at' => 'numeric',
		'mat' => 'numeric',
		'df' => 'numeric',
		'mdf' => 'numeric',
		'agi' => 'numeric',
		'm_name' => 'string',
		's_property' => 'numeric',
		'm_sat_name' => 'string',
		'hp' => 'numeric',
		'sp' => 'numeric',
		'str' => 'numeric',
		'smart' => 'numeric',
		'life' => 'numeric',
		'vit' => 'numeric',
		'au' => 'numeric',
		'be' => 'numeric',
		'skill_1' => 'numeric',
		'skill_2' => 'numeric',
		'skill_3' => 'numeric',
		'skill_4' => 'numeric',
		'skill_5' => 'numeric',
		'time_1' => 'numeric',
		'time_2' => 'numeric',
		'time_3' => 'numeric',
		'm_lv' => 'numeric',
		'm_job_exp' => 'numeric',
		'd_id' => 'string',
		'm_topr' => 'string',
		'm_place' => 'numeric',
		'm_subplace' => 'numeric',
		'm_img' => 'string',
		'm_meet' => 'numeric',
		'm_mission' => 'numeric',
		'm_npc' => 'numeric',
		'm_npc_message' => 'string',
	];
	
	public $dbname = 'DBWOGMonster';
	public function afterValidation(&$data) {
        $ex = DBWOGPlayerTeam::find($data['m_id']);
        if ($data['pkval'] && $ex && $data['pkval']!=$data['m_id']) {
            Response::alert("ID重複");
        }
        foreach ([1, 2, 3, 4, 5] as $n) {
            if ($data["skill_{$n}"] > 0) {
                $s = DBWOGSkill::find($data["skill_{$n}"]);
                if (!$s) {
                    Response::alert("技能{$n}(s_id={$data["skill_{$n}"]})不存在");
                }
            }
        }
        if ($data['d_id']) {
            foreach(explode(',', $data['d_id']) as $d_id) {
                $d = DBWOGItem::find($d_id);
                if (!$d) {
                    Response::alert("道具(d_id={$d_id})不存在");
                }
            }
        }
        if ($data['m_mission'] > 0) {
            $m = DBWOGMission::find($data['m_mission']);
            if (!$m) {
                Response::alert("任務(m_id={$data['m_mission']})不存在");
            }
        }
	}
    
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_monster';
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
                    ->leftJoin('wog_mission_main AS m', $alias.'.m_mission', '=', 'm.m_id')
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get([$alias.'.*', 'm.m_subject AS mission_name']),
		];
		return Response::json($list);
	}
}
