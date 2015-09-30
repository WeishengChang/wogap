<?php
require_once 'EditorController.php';
class PlayerSkillSetupController extends EditorController {
	public $rules = [
			'p_id' => 'required',
			'skill_1' => 'numeric',
			'skill_2' => 'numeric',
			'skill_3' => 'numeric',
			'skill_4' => 'numeric',
			'skill_5' => 'numeric',
			'time_1' => 'numeric',
			'time_2' => 'numeric',
			'time_3' => 'numeric',
			'time_4' => 'numeric',
			'time_5' => 'numeric',
			
	];
	public $dbname = 'DBWOGPlayerSkillSetup';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_skill_setup AS ss')
					->leftJoin('wog_player AS p', 'ss.p_id', '=', 'p.p_id')
					->leftJoin('wog_ch_skill AS a', 'ss.skill_1', '=', 'a.s_id')
					->leftJoin('wog_ch_skill AS b', 'ss.skill_2', '=', 'b.s_id')
					->leftJoin('wog_ch_skill AS c', 'ss.skill_3', '=', 'c.s_id')
					->leftJoin('wog_ch_skill AS d', 'ss.skill_4', '=', 'd.s_id')
					->leftJoin('wog_ch_skill AS e', 'ss.skill_5', '=', 'e.s_id')
					->orderBy('ss.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['ss.*', 'p.p_name', 
						DB::raw('IF(a.s_id, CONCAT(a.s_name, " LV", a.s_lv, " (", ss.time_1, "%)"), "") AS name_1'), 
						DB::raw('IF(b.s_id, CONCAT(b.s_name, " LV", b.s_lv, " (", ss.time_2, "%)"), "") AS name_2'), 
						DB::raw('IF(c.s_id, CONCAT(c.s_name, " LV", c.s_lv, " (", ss.time_3, "%)"), "") AS name_3'), 
						DB::raw('IF(d.s_id, CONCAT(d.s_name, " LV", d.s_lv, " (", ss.time_4, "%)"), "") AS name_4'), 
						DB::raw('IF(e.s_id, CONCAT(e.s_name, " LV", e.s_lv, " (", ss.time_5, "%)"), "") AS name_5')
					]),
		];
		return Response::json($list);
	}
}
