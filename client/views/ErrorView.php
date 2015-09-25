<?php
class ErrorView extends View {
	public function fetch()
	{
		return null;
	}
	public static function render($text) {
		header('content-type: application/json');
		header('charset: utf-8');
		header('cache: no-cache');
		header($_SERVER['SERVER_PROTOCOL'] . ' 422 '. $text, true, 422);
		echo json_encode($text);
	}
}
?>