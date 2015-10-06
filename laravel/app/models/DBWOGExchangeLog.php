<?php

class DBWOGExchangeLog extends Eloquent
{
    protected $table      = 'wog_exchange_book';
    protected $primaryKey = 'eb_id';
    protected $guarded    = [];
    public $timestamps    = false;
    public function exchange() {
        return $this->belongsTo('DBWOGExchange', 'ex_id')->select(['ex_id', 'ex_name']);
    }
}