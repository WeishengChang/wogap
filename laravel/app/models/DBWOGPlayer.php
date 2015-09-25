<?php

class DBWOGPlayer extends Eloquent {
		protected $table = 'wog_player';
		protected $primaryKey = 'p_id';
		protected $guarded = [];
		public $timestamps = FALSE;
}