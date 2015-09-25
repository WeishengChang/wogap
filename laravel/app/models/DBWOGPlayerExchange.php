<?php

class DBWOGPlayerExchange extends Eloquent {
		protected $table = 'wog_exchange_list';
		protected $primaryKey = 'el_id';
		protected $guarded = [];
		public $timestamps = FALSE;
}