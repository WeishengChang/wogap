<?php
require_once 'EditorController.php';
class CharacterSkillController extends EditorController {
	public $rules = [
		's_id' => '',
		'ch_id' => 'numeric',
		'ch_exp' => 'numeric',
		'type' => 'numeric',
		'stime' => 'numeric',
		's_name' => 'numeric',
		's_sp' => 'numeric',
		's_st' => 'numeric',
		's_count' => 'numeric',
		's_text' => 'string',
		's_money' => 'numeric',
		's_lv' => 'numeric',
		'main_sid' => 'numeric',
		'need_sid' => 'numeric',
	];
	
	public $dbname = 'DBWOGCharacterSkill';
	public function afterValidation(&$data) {
        
        $ex = DBWOGCharacterSkill::find($data['s_id']);
        if ($data['pkval'] && $ex && $data['pkval']!=$data['s_id']) {
            Response::alert("ID重複");
        }
        $ch = DBWOGCharacter::find($data['ch_id']);
        if (!$ch) {
            Response::alert("職業(ch_id={$data['ch_id']})不存在");
        }
        if($data['main_sid'] > 0) {
            $s = DBWOGCharacterSkill::find($data['main_sid']);
            if (!$s) {
                Response::alert("親技能(s_id={$data['main_sid']})不存在");
            }
        }
        if($data['need_sid'] > 0) {
            $s = DBWOGCharacterSkill::find($data['need_sid']);
            if (!$s) {
                Response::alert("前置技能(s_id={$data['need_sid']})不存在");
            }
        }
        
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_ch_skill';
		$alias = 'cs';
		$prefix = $alias.'.';
		switch($sort) {
			case 'd_name':
				$prefix = 'd.';
				break;
		}
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), $table.' AS '.$alias)
                    ->leftJoin('wog_character AS ch', $alias.'.ch_id', '=', 'ch.ch_id')
                    ->leftJoin('wog_ch_skill AS main', $alias.'.main_sid', '=', 'main.s_id')
                    ->leftJoin('wog_ch_skill AS need', $alias.'.need_sid', '=', 'need.s_id')
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get([$alias.'.*', 'ch.ch_name', 'main.s_name AS main_name', 'need.s_name AS need_name']),
		];
		return Response::json($list);
	}
}
