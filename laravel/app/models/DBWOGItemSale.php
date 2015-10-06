<?php

class DBWOGItemSale extends Eloquent
{
    protected $table      = 'wog_sale';
    protected $primaryKey = 's_id';
    protected $guarded    = [];
    public $timestamps    = false;
    public function player()
    {
        return $this->belongsTo('\DBWOGPlayer', 'p_id')->select('p_id', 'p_name');
    }
    public function eplayer()
    {
        return $this->belongsTo('\DBWOGPlayer', 'e_p_id')->select('p_id', 'p_name');
    }
    public function item() {
        return $this->belongsTo('DBWOGItem', 'd_id')->select('d_id', 'd_name');
    }
}