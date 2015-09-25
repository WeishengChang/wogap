<?php

class DBWOGPlayerItem extends Eloquent {
		protected $table = 'wog_item';
		protected $primaryKey = 'p_id';
		protected $guarded = [];
		public $timestamps = FALSE;
}