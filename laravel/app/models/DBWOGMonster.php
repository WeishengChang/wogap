<?php

class DBWOGMonster extends Eloquent {
		protected $table = 'wog_monster';
		protected $primaryKey = 'm_id';
		protected $guarded = [];
		public $timestamps = FALSE;
}