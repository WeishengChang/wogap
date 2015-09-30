<?php

class DBWOGSkill extends Eloquent {
		protected $table = 'wog_ch_skill';
		protected $primaryKey = 's_id';
		protected $guarded = [];
		public $timestamps = FALSE;
}