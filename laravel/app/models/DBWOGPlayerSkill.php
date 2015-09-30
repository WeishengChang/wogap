<?php

class DBWOGPlayerSkill extends Eloquent {
		protected $table = 'wog_skill_book';
		protected $primaryKey = 'id';
		protected $guarded = [];
		public $timestamps = FALSE;
}