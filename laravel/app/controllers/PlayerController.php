<?php

class PlayerController extends Controller {
	private $rules = [
			'p_id' => '',
			'p_name' => 'required|min:1|max:10',
			'p_password' => 'required|min:1|max:20',
			'p_email' => 'valid_email',
			'p_ipadd' => 'string',
			'p_act_time' => 'numeric',
			'act_num' => 'numeric',
			'act_num_time' => 'numeric',
			'p_lock_time' => 'numeric',
			'p_st' => 'boolean',
			'p_userlv' => 'numeric',
			'p_lock' => 'boolean',
			'p_npc' => 'boolean',
			's_property' => 'numeric',
			'hp' => 'numeric',
			'hpmax' => 'numeric',
			'sp' => 'numeric',
			'spmax' => 'numeric',
			'ch_id' => 'numeric',
			'p_money' => 'numeric',
			'p_bank' => 'numeric',
			'p_cash' => 'numeric',
			'str' => 'numeric',
			'smart' => 'numeric',
			'agi' => 'numeric',
			'life' => 'numeric',
			'vit' => 'numeric',
			'au' => 'numeric',
			'be' => 'numeric',
			'base_str' => 'numeric',
			'base_smart' => 'numeric',
			'base_agi' => 'numeric',
			'base_life' => 'numeric',
			'base_vit' => 'numeric',
			'base_au' => 'numeric',
			'base_be' => 'numeric',
			'at' => 'numeric',
			'df' => 'numeric',
			'mat' => 'numeric',
			'mdf' => 'numeric',
			'p_exp' => 'numeric',
			'p_nextexp' => 'numeric',
			'p_lv' => 'numeric',
			'p_birth' => 'numeric',
			'p_place' => 'numeric',
			'p_sat_name' => 'string',
			'p_win' => 'numeric',
			'p_lost' => 'numeric',
			'p_sex' => 'numeric',
			'p_img_set' => 'boolean',
			'p_img_url' => 'string',
			'p_pk_s' => 'boolean',
			'p_pk_money' => 'numeric',
			'p_bag' => 'numeric',
			'p_depot' => 'numeric',
			'p_cp_st' => 'boolean',
			'p_cp_time' => 'numeric',
			'i_img' => 'numeric',
			'p_g_id' => 'numeric',
			't_id' => 'numeric',
			'p_support' => 'numeric',
			'p_recomm' => 'numeric',
			'p_attempts' => 'string',
			'p_cdate' => 'numeric',
			'p_online_time' => 'numeric',
			'p_bbsid' => 'numeric',
	];
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
		$player = DBWOGPlayer::find($data[App::make('DBWOGPlayer')->getKeyName()]);
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
		$sort = Input::get("sort", App::make('DBWOGPlayer')->getKeyName());
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
