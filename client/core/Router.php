<?php

abstract class Router
{
	protected $action = 'index';
	abstract function getAction();
}
?>
