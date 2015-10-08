<?php

class DBWOGPlayerTeamJoin extends Eloquent
{
    protected $table      = 'wog_team_join';
    protected $primaryKey = 't_j_id';
    protected $guarded    = [];
    public $timestamps    = false;
    public function team() {
        return $this->belongsTo('DBWOGPlayerTeam', 't_id')->select(['t_id', 't_name']);
    }
    public function leader() {
        return $this->belongsTo('DBWOGPlayer', 'p_id')->select(['p_id', 'p_name']);
    }
}