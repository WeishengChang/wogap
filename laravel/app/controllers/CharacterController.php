<?php
require_once 'EditorController.php';
class CharacterController extends EditorController {
	public $rules = [
		'ch_id' => '',
		'ch_name' => 'numeric',
		'ch_str' => 'string',
		'ch_agi' => 'string',
		'ch_smart' => 'string',
		'ch_life' => 'string',
		'ch_vit' => 'string',
		'ch_mlv' => 'numeric',
		'ch_map' => 'numeric',
		'ch_au' => 'string',
		'ch_be' => 'string',
		'ch_main' => 'numeric',
	];
	
	public $dbname = 'DBWOGCharacter';
	public function afterValidation(&$data) {
        
        $ex = DBWOGCharacter::find($data['ch_id']);
        if ($data['pkval'] && $ex && $data['pkval']!=$data['ch_id']) {
            Response::alert("ID重複");
        }
        if($data['ch_main'] > 0) {
            $ch = DBWOGCharacter::find($data['ch_main']);
            if (!$ch) {
                Response::alert("親職業(ch_id={$data['ch_main']})不存在");
            }
        }
        
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_character';
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
                    ->leftJoin('wog_character AS main', $alias.'.ch_main', '=', 'main.ch_id')
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get([$alias.'.*', 'main.ch_name AS main_name']),
		];
		return Response::json($list);
	}
}
