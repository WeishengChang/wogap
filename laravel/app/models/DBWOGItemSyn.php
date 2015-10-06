<?php

class DBWOGItemSyn extends Eloquent
{
    protected $table      = 'wog_syn';
    protected $primaryKey = 'syn_id';
    protected $guarded    = [];
    public $timestamps    = false;
    public function result()
    {
        return $this->belongsTo('\DBWOGItem', 'syn_result')->select('d_id', 'd_name');
    }
}