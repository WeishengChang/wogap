<?php
require_once 'EditorController.php';
class PlayerItemController extends EditorController {
	public $rules = [
			'p_id' => 'required',
			'a_id' => 'string',
			'd_head_id' => 'string',
			'd_body_id' => 'string',
			'd_hand_id' => 'string',
			'd_foot_id' => 'string',
			'd_item_id' => 'string',
			'd_key_id' => 'string',
			'd_honor_id' => 'string',
			'd_stone_id' => 'string',
			'd_plus_id' => 'string',
	];
	public $dbname = 'DBWOGPlayerItem';
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$list = [
				'total' => call_user_func(array($this->dbname, 'count')), 
				'rows'=> call_user_func(array($this->dbname, 'leftJoin'), 'wog_player', 'wog_item.p_id', '=', 'wog_player.p_id')
					->orderBy('wog_item.'.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get(['wog_item.*', 'wog_player.p_name']),
		];
        $rowmap = [];
        $keys = [
            'a_id' => 'a_name', 
            'd_head_id' => 'head_name', 
            'd_body_id' => 'body_name', 
            'd_hand_id' => 'hand_name', 
            'd_foot_id'=>'foot_name', 
            'd_item_id' => 'item_name', 
            'd_key_id' => 'key_name', 
            'd_honor_id' => 'honor_name', 
            'd_stone_id' => 'stone_name', 
            'd_plus_id' => 'plus_name'
            ];
        $ids = [];
        $map = [];
        $temp = [];
        //整理&歸納
        foreach($list['rows'] as $index => $row) {
            $temp[$index] = [];
            foreach($keys as $key=>$resultname) {
                $temp[$index][$resultname] = [];
                if (!$row[$key]) { //沒資料直接跳過
                    continue;
                }
                $sanitized = preg_replace('/[\:\&]\d+/', '', $row[$key]);
                if (strstr($sanitized, '*') !== FALSE) { //有數量
                    $frag = preg_split('/[\,\*]/', $sanitized);
                    for($i = 0, $len = count($frag); $i < $len; $i += 2) {
                        $ids[] = $frag[$i];
                        if(!isset($map[$frag[$i]])) { //初始化
                            $map[$frag[$i]] = [];
                        }
                        $map[$frag[$i]][] = [$index, $resultname, count($temp[$index][$resultname])];
                        $temp[$index][$resultname][] = $frag[$i+1];
                    }
                } else { //沒數量
                    $frag = explode(',', $sanitized);
                    foreach($frag as $id) {
                        $ids[] = $id;
                        if(!isset($map[$id])) { //初始化
                            $map[$id] = [];
                        }
                        $map[$id][] = [$index, $resultname, count($temp[$index][$resultname])];
                        $temp[$index][$resultname][] = 1;
                    }
                }
            }
        }
        //Response::alert(var_export($ids, true));
        //送出查詢
        $items = DBWOGItem::whereIn('d_id', array_unique($ids))->get();
        //映射
        foreach($items as $item) {
            foreach($map[$item->d_id] as $entry) {
                $temp[$entry[0]][$entry[1]][$entry[2]] = $item->d_name.'*'.$temp[$entry[0]][$entry[1]][$entry[2]];
            }
        }
        //重建
        foreach($temp as $index=>$data1) {
            foreach($data1 as $name => $result) {
                $list['rows'][$index][$name] = implode(', ', $result);
            }
        }
		return Response::json($list);
	}
}
