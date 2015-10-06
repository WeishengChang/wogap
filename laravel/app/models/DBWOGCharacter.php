<?php

class DBWOGCharacter extends Eloquent {
		protected $table = 'wog_character';
		protected $primaryKey = 'ch_id';
		protected $guarded = [];
		public $timestamps = FALSE;
		public function main() {
			return $this->belongsTo('DBWOGCharacter', 'ch_main')->select(['ch_id', 'ch_name']);
		}
}