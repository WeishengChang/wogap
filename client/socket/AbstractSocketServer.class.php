<?php
abstract class AbstractSocketServer {
	public static $INCOMING_DATA = "incoming data";
	public static $LOSE_CONNECT = "lose connect";
	
	protected $host;
	protected $port;
	public $socket;
	public $clients = array();
	
	private static function buildSocket(&$socket, $host, $port) {
		$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP); //Create TCP/IP sream socket
		socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1); //reuseable port
		socket_bind($socket, $host, $port);	//bind socket to specified host
		socket_listen($socket); //listen to port
	}
	
	function SocketServer($host, $port) {
		$this->host = $host;
		$this->port = $port;
		AbstractSocketServer::buildSocket($this->socket, $host, $port);
	}
	
	abstract function newConnect($newSocket);
	
	/**
	 * 當連線的 socket 有變化時的對應動作。
	 * 
	 * 當 socket 的狀態是傳送資料時，需要回傳 AbstractSocketServer::$INCOMING_DATA。
	 * 當 socket 的狀態是斷線時，需要回傳 AbstractSocketServer::$LOSE_CONNECT。
	 * @return string AbstractSocketServer::$INCOMING_DATA 或 AbstractSocketServer::$LOSE_CONNECT
	 * @param resource $socket
	 */
	abstract function socketChanged($socket);
	
	function response($response) {
		foreach($this->clients as $changed_socket) {
			@socket_write($changed_socket, $response, strlen($response));
		}
	}
}