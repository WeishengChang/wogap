<?php

class DBWOGPlayerFriend extends Eloquent {
		protected $table = 'wog_friend_list';
		protected $primaryKey = 'id';
		protected $guarded = [];
		public $timestamps = FALSE;
}