<?php

class DBWOGCharacterSkill extends Eloquent {
		protected $table = 'wog_character';
		protected $primaryKey = 'ch_id';
		protected $guarded = [];
		public $timestamps = FALSE;
		public function character() {
			return $this->belongsTo('DBWOGCharacter', 'ch_id')->select(['ch_name']);
		}
		public function skill() {
			return $this->belongsTo('DBWOGCharacterSkill', 'main_sid')->select(['s_name AS main_name']);
		}
		public function need() {
			return $this->belongsTo('DBWOGCharacterSkill', 'need_sid')->select(['s_name AS need_name']);
		}
}