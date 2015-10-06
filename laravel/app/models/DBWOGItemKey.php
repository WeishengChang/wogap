<?php

class DBWOGItemkey extends Eloquent
{
    protected $table      = 'wog_key_main';
    protected $primaryKey = 'd_id';
    protected $guarded    = [];
    public $timestamps    = false;
    public function item()
    {
        return $this->belongsTo('\DBWOGItem', 'd_id')->select('d_id', 'd_name');
    }
}