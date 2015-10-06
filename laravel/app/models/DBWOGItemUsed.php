<?php

class DBWOGItemUsed extends Eloquent
{
    protected $table      = 'wog_df_used';
    protected $primaryKey = 'd_id';
    protected $guarded    = [];
    public $timestamps    = false;
    public function item()
    {
        return $this->belongsTo('\DBWOGItem', 'd_id')->select('d_id', 'd_name');
    }
    public function character()
    {
        return $this->belongsTo('DBWOGCharacter', 'ch_id')->select(['ch_name']);
    }
    public function skill()
    {
        return $this->belongsTo('DBWOGCharacterSkill', 'skill_id')->select(['s_name']);
    }
}