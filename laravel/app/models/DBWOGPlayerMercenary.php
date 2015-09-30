<?php

class DBWOGPlayerMercenary extends Eloquent {
		protected $table = 'wog_mercenary_list';
		protected $primaryKey = 'id';
		protected $guarded = [];
		public $timestamps = FALSE;
}