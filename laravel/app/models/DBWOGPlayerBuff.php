<?php

class DBWOGPlayerBuff extends Eloquent {
		protected $table = 'wog_player_buffer';
		protected $primaryKey = 'p_id';
		protected $guarded = [];
		public $timestamps = FALSE;
}