<?php

class DBWOGPlayerMission extends Eloquent {
	protected $table = 'wog_mission_book';
	protected $primaryKey = 'id';
	protected $guarded = [];
	public $timestamps = FALSE;
}