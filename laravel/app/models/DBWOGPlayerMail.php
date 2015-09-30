<?php

class DBWOGPlayerMail extends Eloquent {
		protected $table = 'wog_message_box';
		protected $primaryKey = 'id';
		protected $guarded = [];
		public $timestamps = FALSE;
}