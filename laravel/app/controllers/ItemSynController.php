<?php
require_once 'EditorController.php';
class ItemSynController extends EditorController {
	public $rules = [
		'syn_id' => '',
		'syn_element' => 'string',
		'syn_topr' => 'numeric',
		'syn_num' => 'numeric',
		'syn_mission' => 'numeric',
		'syn_need_mission' => 'numeric'
	];
	
	public $dbname = 'DBWOGItemSyn';
	public function afterValidation(&$data) {
        $item = DBWOGItem::find($data['syn_result']);
        if (!$item) {
            Response::alert("合成結果(d_id={$data['syn_result']})不存在");
        }
        $list = preg_split('/[\*\,]/i', $data['syn_element']);
        for($i = 0, $len = count($list); $i < $len; $i+=2) {
            $item = DBWOGItem::find($list[$i]);
            if (!$item) {
                Response::alert("物品(id={$list[$i]})不存在");
            }
            if (!ctype_digit(strval($list[$i+1])) || $list[$i+1] < 0) {
                Response::alert("第".(($i+2)/2)."項材料的數量({$list[$i+1]})不是正整數");
            }
        }
        if($data['syn_mission'] > 0) {
            $mission = DBWOGMission::find($data['syn_mission']);
            if(!$mission) {
                Response::alert("專屬任務(m_id={$data['syn_mission']})不存在");
            }
        }
        if($data['syn_need_mission'] > 0) {
            $mission = DBWOGMission::find($data['syn_need_mission']);
            if(!$mission) {
                Response::alert("前置任務(m_id={$data['syn_need_mission']})不存在");
            }
        }
	}
	public function show() {
		$page = Input::get("page");
		$rows = Input::get("rows");
		$sort = Input::get("sort", App::make($this->dbname)->getKeyName());
		$order = Input::get("order", 'ASC');
		$table = 'wog_syn';
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
					->leftJoin('wog_df AS d', $alias.'.syn_result', '=', 'd.d_id')
					->orderBy($prefix.$sort, $order)
					->skip(($page-1)*$rows)
					->take($rows)
					->get([$alias.'.*', 'd.d_name']),
		];
        //整理要抓出的d_id
        $ids = [];
        $idmap = [];
        $elements = [];
        foreach ($list['rows'] as $k=>$row) {
            $data = preg_split('/[\*\,]/i', $row['syn_element']);
            $temp = [];
            for ($i = 0, $len = count($data); $i < $len; $i+=2) {
                $ids[] = $data[$i];
                $idmap[$data[$i]][] = [$k, floor($i/2)];
                $temp[] = $data[$i+1];
            }
            $elements[] = $temp;
        }
        $items = DBWOGItem::whereIn('d_id', array_unique($ids))->get();
        foreach($items as $k=>$item) {
            foreach($idmap[$item->d_id] as $map) {
                $elements[$map[0]][$map[1]] = $item->d_name.'*'.$elements[$map[0]][$map[1]];
            }
        }
        foreach($elements as $k=>$element) {
            $list['rows'][$k]['syn_name'] = implode(', ', $element);
        }
		return Response::json($list);
	}
}
