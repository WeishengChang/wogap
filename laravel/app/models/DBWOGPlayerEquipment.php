<?php

class DBWOGPlayerEquipment extends Eloquent {
		protected $table = 'wog_player_arm';
		protected $primaryKey = 'p_id';
		protected $guarded = [];
		public $timestamps = FALSE;
}