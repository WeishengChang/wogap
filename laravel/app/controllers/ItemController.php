<?php
require_once 'EditorController.php';
class ItemController extends EditorController {
	public $rules = [
		'd_id' => '',
		'd_df' => 'numeric',
		'd_mdf' => 'numeric',
		'd_at' => 'numeric',
		'd_mat' => 'numeric',
		'd_mstr' => 'numeric',
		'd_msmart' => 'numeric',
		'd_magl' => 'numeric',
		'd_mau' => 'numeric',
		'ch_id' => 'numeric',
		'd_money' => 'numeric',
		'd_name' => 'string',
		'd_type' => 'numeric',
		'd_fie' => 'numeric',
		'd_dbst' => 'numeric',
		'd_g_hp' => 'numeric',
		'd_g_sp' => 'numeric',
		'd_g_str' => 'numeric',
		'd_g_smart' => 'numeric',
		'd_g_agi' => 'numeric',
		'd_g_life' => 'numeric',
		'd_g_vit' => 'numeric',
		'd_g_au' => 'numeric',
		'd_g_be' => 'numeric',
		'd_s' => 'numeric',
		'd_hole' => 'numeric',
		'd_plus' => 'numeric',
		'd_lv' => 'numeric',
		'skill' => 'numeric',
		'stime' => 'numeric',
		'ch_pro' => 'numeric',
		'd_send' => 'numeric',
		'd_vip' => 'numeric',
	];
	
	public $dbname = 'DBWOGItem';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$prefix = 'd.';
		switch($sort) {
			case 'ch_name':
				$prefix = 'ch.';
				break;
			case 'sk_name':
				$prefix = 'sk.';
				break;
		}
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_df AS d')
					->leftJoin('wog_character AS ch', 'd.ch_id', '=', 'ch.ch_id')
					->leftJoin('wog_ch_skill AS sk', 'd.skill', '=', 'sk.s_id')
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['d.*', 'ch.ch_name', 'sk.s_name']),
		];
		return Response::json($list);
	}
}
