<?php
define('STAT_MODE_DIVISION', 1);

function alert($msg) {
	ErrorView::render($msg);
	//echo json_encode(array('error'=>$msg));
	exit;
}

function extendArray(&$to, $from) {
	foreach($from as $k=>$v) {
		$to[$k] = $v;
	}
	return $o;
}

function extendObject(&$to, $from) {
	foreach($from as $k=>$v) {
		$to->$k = $v;
	}
	return $to;
}

/**
* 將字串轉換成巴斯卡式
*/
function pascal($scored) {
	return implode('',array_map('ucfirst',array_map('strtolower',explode('_', $scored))));
}
/**
* 將底線連結式字串轉換成駝峰式
*/
function camelize($scored) {
	return lcfirst(pascal($scored));
}

/**
* 將駝峰式字串轉換成底線連結式
*/
function underscore($cameled) {
	return implode('_',array_map('strtolower',preg_split('/([A-Z]{1}[^A-Z]*)/', $cameled, -1, PREG_SPLIT_DELIM_CAPTURE|PREG_SPLIT_NO_EMPTY)));
}
?>