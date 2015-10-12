<?php
require_once 'EditorController.php';
class AvatarController extends EditorController {
	public $rules = [
		'i_id' => '',
		'i_filename' => 'string',
	];
	
	public $dbname = 'DBWOGAvatar';
	public function afterValidation(&$data) {
        $ex = DBWOGPlayerTeam::find($data['i_id']);
        if ($data['pkval'] && $ex && $data['pkval']!=$data['i_id']) {
            Response::alert("ID重複");
        }
	}
    
    public function teardown($data) {
        //更新character的cache data
        $filename = '../../client/json/cache.avatar.json';
        $all = DBWOGAvatar::all();
        $arr = [];
        foreach ($all as $avatar) {
            $arr[$avatar->i_id] = $avatar->i_filename;
        }$fp = fopen($filename, 'w+');
        flock($fp, LOCK_EX);
        fputs($fp, json_encode($arr));
        flock($fp, LOCK_UN);
        fclose($fp);
    }
    
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_img';
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
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get([$alias.'.*']),
		];
		return Response::json($list);
	}
}
