<?php
require_once 'EditorController.php';
class ItemSaleController extends EditorController {
	public $rules = [
		's_id' => '',
		'p_id' => 'numeric',
		'd_id' => 'numeric',
		'd_type' => 'numeric',
		'hs_id' => 'numeric',
		'ps_id' => 'numeric',
		'item_num' => 'numeric',
		's_money' => 'numeric',
		's_type' => 'numeric',
		'e_money' => 'numeric',
		'e_p_id' => 'numeric',
		'dateline' => 'numeric',
	];
	
	public $dbname = 'DBWOGItemSale';
	public function afterValidation(&$data) {
        $player = DBWOGPlayer::find($data['p_id']);
        if (!$player) {
            Response::alert("拍賣玩家(p_id={$data['p_id']})不存在");
        }
        if($data['e_p_id'] > 0) {
            $eplayer = DBWOGPlayer::find($data['e_p_id']);
            if (!$eplayer) {
                Response::alert("競標玩家(p_id={$data['e_p_id']})不存在");
            }
        }
        
        $item = DBWOGItem::find($data['d_id']);
        if (!$item) {
            Response::alert("拍賣物品(d_id={$data['d_id']})不存在");
        }
        $sale = DBWOGItemSale::find($data['s_id']);
        if ($data['pkval'] && $sale && $data['pkval']!=$data['s_id']) {
            Response::alert("ID重複");
        }
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_sale';
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
					->leftJoin('wog_player AS p', $alias.'.p_id', '=', 'p.p_id')
					->leftJoin('wog_player AS e', $alias.'.e_p_id', '=', 'e.p_id')
					->leftJoin('wog_df AS d', $alias.'.d_id', '=', 'd.d_id')
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get([$alias.'.*', 'p.p_name', 'e.p_name AS e_name', 'd.d_name']),
		];
		return Response::json($list);
	}
}
