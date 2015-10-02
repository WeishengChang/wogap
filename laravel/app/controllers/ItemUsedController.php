<?php
require_once 'EditorController.php';
class ItemUsedController extends EditorController {
	public $rules = [
		'd_id' => '',
		'd_lv' => 'numeric',
		'd_type' => 'numeric',
		'd_g_exp' => 'numeric',
		'd_g_bag' => 'numeric',
		'ch_id' => 'numeric',
		'skill_id' => 'numeric',
		'use_time' => 'numeric',
		'exp' => 'numeric',
		'skill_exp' => 'numeric',
		'at' => 'numeric',
		'mat' => 'numeric',
		'df' => 'numeric',
		'mdf' => 'numeric',
		'hp' => 'numeric',
		'sp' => 'numeric'
	];
	
	public $dbname = 'DBWOGItemUsed';
	public function afterValidation(&$data) {
		$item = DBWOGItem::find($data['d_id']);
		if(!$item) 
			Response::alert("物品不存在");
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_df_used';
		$alias = 'du';
		$prefix = $alias.'.';
		switch($sort) {
			case 'd_name':
				$prefix = 'd.';
				break;
		}
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), $table.' AS '.$alias)
					->leftJoin('wog_df AS d', $alias.'.d_id', '=', 'd.d_id')
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get([$alias.'.*', 'd.d_name']),
		];
		return Response::json($list);
	}
}
