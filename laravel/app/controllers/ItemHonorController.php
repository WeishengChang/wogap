<?php
require_once 'EditorController.php';
class ItemHonorController extends EditorController {
	public $rules = [
		'h_id' => '',
		'item_id' => 'numeric',
		'h_type' => 'numeric',
		'h_1' => 'numeric',
		'h_2' => 'numeric',
		'h_3' => 'numeric',
		'h_4' => 'numeric',
		'h_5' => 'numeric',
		'item_num' => 'numeric',
	];
	
	public $dbname = 'DBWOGItemHonor';
	public function afterValidation(&$data) {
		$item = DBWOGItem::find($data['item_id']);
		if (!$item)
        {
            Response::alert("物品(item_id={$data['item_id']})不存在");
        }
        $item = DBWOGItemHonor::where('item_Id', '=', $data['item_id'])->with('item')->get();
        if (count($item) > 0 && (!$data['pkval'] || $data['pkval'] != $item[0]->h_id)) 
        {
            Response::alert("{$item[0]->item->d_name}(d_id={$data['item_id']})已有定義，不可重複定義");
        }
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_honor_main';
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
					->leftJoin('wog_df AS d', $alias.'.item_id', '=', 'd.d_id')
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get([$alias.'.*', 'd.d_name']),
		];
		return Response::json($list);
	}
}
