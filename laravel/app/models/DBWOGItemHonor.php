<?php

class DBWOGItemHonor extends Eloquent
{
    protected $table      = 'wog_honor_main';
    protected $primaryKey = 'h_id';
    protected $guarded    = [];
    public $timestamps    = false;
    public function item()
    {
        return $this->belongsTo('\DBWOGItem', 'item_id')->select('d_id', 'd_name');
    }
}