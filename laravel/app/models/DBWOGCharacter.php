<?php

class DBWOGCharacter extends Eloquent {
		protected $table = 'wog_character';
		protected $primaryKey = 'ch_id';
		protected $guarded = [];
		public $timestamps = FALSE;
		public function parent() {
			return $this->hasOne('DBWOGCharacter', 'ch_id', 'ch_main')->select(['ch_name AS main_name']);
		}
}