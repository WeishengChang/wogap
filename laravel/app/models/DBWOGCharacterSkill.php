<?php

class DBWOGCharacterSkill extends Eloquent {
		protected $table = 'wog_ch_skill';
		protected $primaryKey = 's_id';
		protected $guarded = [];
		public $timestamps = FALSE;
		public function character() {
			return $this->belongsTo('DBWOGCharacter', 'ch_id')->select(['ch_id', 'ch_name']);
		}
		public function main() {
			return $this->belongsTo('DBWOGCharacterSkill', 'main_sid')->select(['s_id', 's_name']);
		}
		public function need() {
			return $this->belongsTo('DBWOGCharacterSkill', 'need_sid')->select(['s_id', 's_name']);
		}
}