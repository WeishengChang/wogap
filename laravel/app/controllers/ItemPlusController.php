<?php
require_once 'EditorController.php';
class ItemPlusController extends EditorController {
	public $rules = [
		'd_id' => '',
		'd_type' => 'numeric',
		'd_lv' => 'numeric',
		'd_at' => 'numeric',
		'd_mat' => 'numeric',
		'd_df' => 'numeric',
		'd_mdf' => 'numeric',
		'd_agi' => 'numeric',
		'd_str' => 'numeric',
		'd_life' => 'numeric',
		'd_vit' => 'numeric',
		'd_smart' => 'numeric',
		'd_au' => 'numeric',
		'd_be' => 'numeric'
	];
	
	public $dbname = 'DBWOGItemPlus';
	public function afterValidation(&$data) {
		$item = DBWOGItem::find($data['d_id']);
		if (!$item)
        {
            Response::alert("物品(d_id={$data['d_id']})不存在");
        }
        $stone = DBWOGItemPlus::with('item')->find($data['d_id']);
        if($stone && $data['d_id'] != $data['pkval']) {
            Response::alert("{$stone->item->d_name}(d_id={$data['d_id']})已有定義，不可重複定義");
        }
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_plus_list';
		$alias = 'dp';
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
