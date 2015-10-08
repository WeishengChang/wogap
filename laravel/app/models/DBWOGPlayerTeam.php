<?php

class DBWOGPlayerTeam extends Eloquent
{
    protected $table      = 'wog_team_main';
    protected $primaryKey = 't_id';
    protected $guarded    = [];
    public $timestamps    = false;
    public function leader() {
        return $this->belongsTo('DBWOGPlayer', 'p_id')->select(['p_id', 'p_name']);
    }
}