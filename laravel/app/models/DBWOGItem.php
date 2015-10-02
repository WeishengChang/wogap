<?php

class DBWOGItem extends Eloquent {
		protected $table = 'wog_df';
		protected $primaryKey = 'd_id';
		protected $guarded = [];
		public $timestamps = FALSE;
		public function character() {
			return $this->belongsTo('DBWOGCharacter', 'ch_id')->select(['ch_name']);
		}
		public function skill() {
			return $this->belongsTo('DBWOGCharacterSkill', 'skill')->select(['s_name']);
		}
}