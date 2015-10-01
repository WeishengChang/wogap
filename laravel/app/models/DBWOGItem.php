<?php

class DBWOGItem extends Eloquent {
		protected $table = 'wog_df';
		protected $primaryKey = 'd_id';
		protected $guarded = [];
		public $timestamps = FALSE;
		public function character() {
			return $this->hasOne('DBWOGCharacter', 'ch_id', 'ch_id')->select(['ch_name']);
		}
		public function skill() {
			return $this->hasOne('DBWOGCharacterSkill', 's_id', 'skill')->select(['s_name']);
		}
}