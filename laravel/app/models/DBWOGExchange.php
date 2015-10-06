<?php

class DBWOGExchange extends Eloquent
{
    protected $table      = 'wog_exchange_main';
    protected $primaryKey = 'ex_id';
    protected $guarded    = [];
    public $timestamps    = false;
}