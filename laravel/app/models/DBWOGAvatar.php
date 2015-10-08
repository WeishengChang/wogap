<?php

class DBWOGAvatar extends Eloquent
{
    protected $table      = 'wog_img';
    protected $primaryKey = 'i_id';
    protected $guarded    = [];
    public $timestamps    = false;
}