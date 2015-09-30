<?php

class DBWOGPlayerPet extends Eloquent {
		protected $table = 'wog_pet';
		protected $primaryKey = 'pe_id';
		protected $guarded = [];
		public $timestamps = FALSE;
}