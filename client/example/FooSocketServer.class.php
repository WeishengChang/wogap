<?php
require_once dirname(__FILE__).'/../socket/AbstractSocketServer.class.php';

class FooSocketServer extends AbstractSocketServer{
	private $wsServer;

	function FooSocketServer($host, $port, $websocketServer) {
		parent::SocketServer($host, $port);
		$this->wsServer = $websocketServer;
	}

	function newConnect($newSocket) {
		$this->wsServer->doNewConnect($newSocket);
	}

	function socketChanged($socket) {
		return false;
	}
}