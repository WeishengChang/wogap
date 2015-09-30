<?php

class EditorController extends Controller {
	protected $rules = [];
	protected $dbname = '';
	public function __construct() {
		
	}
	public function add() {
		$data = Input::all();
		if(method_exists($this, 'beforeValidation')) {
			$this->beforeValidation($data);
		}
		$validator = Validator::make($data, $this->rules);
		if($validator->fails()) {
			return Response::alert($validator->messages());
		}
		if(method_exists($this, 'afterValidation')) {
			$this->afterValidation($data);
		}
		$player = new $this->dbname($data);
		$player->save();
		return Response::json(['reload'=>TRUE]);
	}
	public function edit() {
		$data = Input::all();
		$validator = Validator::make($data, $this->rules);
		if($validator->fails()) {
			return Response::alert($validator->messages()->first());
		}
		if(method_exists($this, 'afterValidation')) {
			$this->afterValidation($data);
		}
		$player = call_user_func(array($this->dbname, 'find'), $data[App::make($this->dbname)->getKeyName()]);
		$player->fill($data);
		$player->save();
		return Response::json(['reload'=>TRUE]);
	}
	public function del($id) {
		$id = (int) $id;
		App::error(function(ModelNotFoundException $e) {
			return Response::alert("不存在的項目");
		});
		$p = call_user_func(array($this->dbname, 'findOrFail'), $id);
		$p->delete();
		return Response::json(['reload'=>TRUE]);
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'orderBy'), $sort, $order)
									->skip(($page-1)*$rows)
									->take($rows)
									->get(),
		];
		return Response::json($list);
	}
}
