<?php

class DBWOGMission extends Eloquent
{
    protected $table      = 'wog_mission_main';
    protected $primaryKey = 'm_id';
    protected $guarded    = [];
    public $timestamps    = false;
    public function need()
    {
        return $this->belongsTo('\DBWOGMission', 'm_need_id')->select('m_id', 'm_name', 'm_subject');
    }
    public function not()
    {
        return $this->belongsTo('\DBWOGMission', 'm_not_id')->select('m_id', 'm_name', 'm_subject');
    }
    public function monster()
    {
        return $this->belongsTo('\DBWOGMonster', 'm_monster_id')->select('m_id', 'm_name');
    }
    public function pet()
    {
        return $this->belongsTo('\DBWOGMission', 'm_pet_id')->select('m_id', 'm_name');
    }
}