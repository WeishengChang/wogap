<?php

class DBWOGPlayerLog extends Eloquent {
		protected $table = 'wog_vip_log';
		protected $primaryKey = 'id';
		protected $guarded = [];
		public $timestamps = FALSE;
}