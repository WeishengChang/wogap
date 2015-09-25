<?php
if(!defined('APP_REAL_PATH')) {
	define('APP_REAL_PATH', './');
}

if(!defined('WOG_PATH')) {
	define('WOG_PATH', APP_REAL_PATH.'../wog45/');
}
$include_path = array ();
// 系統的 include_path
$include_path[] = get_include_path();
// 目前專案所需要的 include_path
$include_path[] = APP_REAL_PATH . 'core';
$include_path[] = APP_REAL_PATH . 'controllers';
$include_path[] = APP_REAL_PATH . 'models';
$include_path[] = APP_REAL_PATH . 'views';
$include_path[] = APP_REAL_PATH . 'traits';
// 設定新的 include_path
set_include_path(join(PATH_SEPARATOR, $include_path));
function __autoload($class_name)
{
	require_once $class_name . '.php';
}

require_once('include/config.inc.php');
require_once('include/function.inc.php');
$router = new MixedRouter;
$f = ucfirst($router->getFolk()).'Controller';
//echo APP_REAL_PATH."controllers/{$f}.php";
if(!file_exists(APP_REAL_PATH."controllers/{$f}.php")) {
	//echo APP_REAL_PATH."controllers/{$f}.php";
}
//include_once(APP_REAL_PATH."controllers/{$f}.php");
DBC::setup($dbconfig);
unset($dbconfig);
switch($router->getFolk()) {
	default:
			$f = new $f($router->getAction());
			$f->run();
		break;
}
//echo json_encode(array(1,2,3));
?>