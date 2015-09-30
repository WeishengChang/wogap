<?php

class DBWOGPlayerFriend extends Eloquent {
		protected $table = 'wog_player_buffer';
		protected $primaryKey = 'id';
		protected $guarded = [];
		public $timestamps = FALSE;
}