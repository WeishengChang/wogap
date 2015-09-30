<?php
require_once 'EditorController.php';
class PlayerPetController extends EditorController {
	public $rules = [
		'pe_id' => '',
		'pe_p_id' => 'required|numeric',
		'pe_m_id' => 'required|numeric',
		'pe_at' => 'numeric',
		'pe_mt' => 'numeric',
		'pe_fu' => 'numeric',
		'pe_def' => 'numeric',
		'pe_hu' => 'numeric',
		'pe_type' => 'numeric',
		'pe_age' => 'numeric',
		'pe_he' => 'numeric',
		'pe_fi' => 'numeric',
		'pe_dateline' => 'numeric',
		'pe_mname' => '',
		'pe_st' => 'numeric',
		'pe_money' => 'numeric',
		'pe_s_dateline' => 'numeric',
		'pe_b_dateline' => 'numeric',
		'pe_f_dateline' => 'numeric',
		'pe_b_old' => 'numeric',
		'pe_mimg' => 'string',
		'pe_img_url' => 'string',
		'pe_img_set' => 'numeric',
		'pe_send' => 'numeric'
			
	];
	
	public function afterValidation(&$data) {
		$monster = DBWOGMonster::find($data['pe_m_id']);
		$data['pe_mname'] = $monster['m_name'];
	}
	public $dbname = 'DBWOGPlayerPet';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_pet AS pp')
					->leftJoin('wog_player AS p', 'pp.pe_p_id', '=', 'p.p_id')
					->leftJoin('wog_monster AS m', 'pp.pe_m_id', '=', 'm.m_id')
					->orderBy('pp.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['pp.*', 'p.p_name', 'm.m_name AS pe_mname']),
		];
		return Response::json($list);
	}
}
