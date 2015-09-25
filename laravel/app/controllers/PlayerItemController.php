<?php

class PlayerItemController extends EditorController {
	private $rules = [
			'p_id' => 'required',
			'p_name' => 'required|min:1|max:10',
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
	private $dbname = 'DBWOGPlayerItem';
}
