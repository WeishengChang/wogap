<?php

class EditorController extends Controller {
	protected $rules = [];
	protected $dbname = '';
	
	public function __construct($dbname) {
		parent::__construct();
		$this->dbname = $dbname;
	}
	public function add() {
		$data = Input::all();
		$validator = Validator::make($data, $this->rules);
		if($validator->fails()) {
			return Response::alert($validator->messages());
		}
		$player = new DBWOGPlayer($data);
		$player->save();
		return Response::json(['reload'=>TRUE]);
	}
	public function edit() {
		$data = Input::all();
		$validator = Validator::make($data, $this->rules);
		if($validator->fails()) {
			return Response::alert($validator->messages());
		}
		$player = DBWOGPlayer::find($data[App::make($this->dbname)->getKeyName()]);
		$player->fill($data);
		$player->save();
		return Response::json(['reload'=>TRUE]);
	}
	public function del($id) {
		$id = (int) $id;
		App::error(function(ModelNotFoundException $e) {
			return Response::alert("玩家不存在");
		});
		$p = DBWOGPlayer::findOrFail($id);
		$p->delete();
		return Response::json(['reload'=>TRUE]);
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => DBWOGPlayer::count(), 
				'rows'=> DBWOGPlayer::orderBy($sort, $order)
									->skip(($page-1)*$rows)
									->take($rows)
									->get(),
		];
		return Response::json($list);
	}
}
