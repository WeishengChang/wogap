<?php
require_once 'EditorController.php';
class PlayerChexpController extends EditorController {
	public $rules = [
			'p_id' => 'required',
			'ch_6' => 'numeric',
			'ch_7' => 'numeric',
			'ch_8' => 'numeric',
			'ch_9' => 'numeric',
			'ch_10' => 'numeric',
			'ch_11' => 'numeric',
			'ch_12' => 'numeric',
			'ch_13' => 'numeric',
			'ch_14' => 'numeric',
			'ch_15' => 'numeric',
			'ch_16' => 'numeric',
			'ch_17' => 'numeric',
			'ch_18' => 'numeric',
			'ch_19' => 'numeric',
			'ch_20' => 'numeric',
			'ch_21' => 'numeric',
			'ch_22' => 'numeric',
			'ch_23' => 'numeric',
			'ch_24' => 'numeric',
			'ch_25' => 'numeric',
			'ch_26' => 'numeric',
			'ch_27' => 'numeric',
			'ch_28' => 'numeric',
			'ch_29' => 'numeric',
			'ch_30' => 'numeric',
			'ch_31' => 'numeric',
			'ch_32' => 'numeric',
			'ch_33' => 'numeric',
			'ch_34' => 'numeric',
			'ch_35' => 'numeric',
			'ch_36' => 'numeric',
			'ch_37' => 'numeric',
			'ch_38' => 'numeric',
			'sk_6' => 'numeric',
			'sk_7' => 'numeric',
			'sk_8' => 'numeric',
			'sk_9' => 'numeric',
			'sk_10' => 'numeric',
			'sk_11' => 'numeric',
			'sk_12' => 'numeric',
			'sk_13' => 'numeric',
			'sk_14' => 'numeric',
			'sk_15' => 'numeric',
			'sk_16' => 'numeric',
			'sk_17' => 'numeric',
	];
	public $dbname = 'DBWOGPlayerChexp';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'from'), 'wog_ch_exp AS ce')
					->leftJoin('wog_player AS p', 'ce.p_id', '=', 'p.p_id')
					->orderBy('ce.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['ce.*', 'p.p_name']),
		];
		return Response::json($list);
	}
}
