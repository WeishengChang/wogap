<?php
require_once 'EditorController.php';
class PlayerSkillController extends EditorController {
	public $rules = [
			'id' => '',
			'p_id' => 'required|numeric',
			's_id' => 'required|numeric',
			'main_sid' => 'numeric',
			's_lv' => 'numeric'
			
	];
	public $dbname = 'DBWOGPlayerSkill';
	
	public function afterValidation(&$data) {
		$skill = DBWOGSkill::find($data['s_id']);
		$data['s_lv'] = $skill->s_lv;
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_skill_book AS sb')
					->leftJoin('wog_player AS p', 'sb.p_id', '=', 'p.p_id')
					->leftJoin('wog_ch_skill AS a', 'sb.s_id', '=', 'a.s_id')
					->leftJoin('wog_ch_skill AS b', 'sb.main_sid', '=', 'b.s_id')
					->orderBy('sb.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['sb.*', 'p.p_name', 
						DB::raw('IF(a.s_id, CONCAT(a.s_name, " LV", a.s_lv), "") AS name'), 
						DB::raw('IF(b.s_id, CONCAT(b.s_name, " LV", b.s_lv), "") AS main_name')
					]),
		];
		return Response::json($list);
	}
}
