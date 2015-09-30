<?php

class DBWOGPlayerMessage extends Eloquent {
		protected $table = 'wog_message';
		protected $primaryKey = 'm_id';
		protected $guarded = [];
		public $timestamps = FALSE;
}