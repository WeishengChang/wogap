<?php
//使用Basic authentication
$username = 'test';
$password = '1234';
if (!isset($_SERVER['PHP_AUTH_USER']) || ($username != $_SERVER['PHP_AUTH_USER'] || $password != $_SERVER['PHP_AUTH_PW'])) {
    header('WWW-Authenticate: Basic realm="WOGAP Login request"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'WOGAP access forbidden.';
    exit;
}
define('LIBRARY_PATH', '../libs/');
define('LIBRARY_CSS_PATH', '../libs-css/');
?>
<!DOCTYPE html>
<html charset="utf-8">
	<head>
		<title>WOGAP Demo</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
		<link type="image/x-icon" rel="shortcut icon" href="./images/favicon.png"/>
		<link type="text/css" rel="stylesheet" href="<?=LIBRARY_CSS_PATH?>normalize.css"/>
		<link type="text/css" rel="stylesheet" href="<?=LIBRARY_CSS_PATH?>easyui-themes/gray/easyui.css"/>
		<link type="text/css" rel="stylesheet" href="<?=LIBRARY_CSS_PATH?>easyui-themes/color.css">
		<link type="text/css" rel="stylesheet" href="<?=LIBRARY_CSS_PATH?>easyui-themes/icon.css">
		<link type="text/css" rel="stylesheet" href="css/main.css">
		<script type="text/javascript" src="js/libs.js"></script>
		<script type="text/javascript" src="js/config.woggrid.js"></script>
		<script type="text/javascript" src="js/main.all.js"></script>
		<script type="text/javascript" src="js/templates.js"></script>
	</head>
	<body>
	</body>
</html>