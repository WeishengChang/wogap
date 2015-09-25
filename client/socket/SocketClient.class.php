<?php
require_once dirname(__FILE__).'/../StringUtil.class.php';
class SocketClient {
	private $socket;
	
	function SocketClient ($host, $port) {
		$this->socket = fsockopen($host, $port, $errno, $errstr, 30);
		if (!$this->socket) {
			throw new Exception("Cannot open socket.");
		}
	}
	
	public function getResponse() {
		return fgets($this->socket); 
	}
	
	public function request($msg) {
		//避免指令忘記包含換行符號
		if (!StringUtil::endWith($msg, "\r\n")) {
			$msg .= "\r\n";
		}
		return fwrite($this->socket, $msg);
	}
	
	public function close() {
		return fclose($this->socket);
	}
}