<?php
require_once 'EditorController.php';
class ItemStoneController extends EditorController {
	public $rules = [
		'd_id' => '',
		'd_lv' => 'numeric',
		'd_class' => 'numeric',
		's_at' => 'numeric',
		's_mat' => 'numeric',
		's_df' => 'numeric',
		's_mdf' => 'numeric',
		's_agl' => 'numeric',
		's_str' => 'numeric',
		's_life' => 'numeric',
		's_vit' => 'numeric',
		's_smart' => 'numeric',
		's_au' => 'numeric',
		's_be' => 'numeric',
		's_hpmax' => 'numeric'
	];
	
	public $dbname = 'DBWOGItemStone';
	public function afterValidation(&$data) {
		$item = DBWOGItem::find($data['d_id']);
		if(!$item) 
			Response::alert("物品(d_id={$data['d_id']})不存在");
        $stone = DBWOGItemStone::with('item')->find($data['d_id']);
        if($stone && $data['d_id'] != $data['pkval']) {
            Response::alert("{$stone->item->d_name}(d_id={$data['d_id']})已有定義，不可重複定義");
        }
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_stone_list';
		$alias = 'ds';
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
