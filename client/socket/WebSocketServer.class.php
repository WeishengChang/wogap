<?php
require_once "AbstractSocketServer.class.php";

abstract class WebSocketServer extends AbstractSocketServer {
	abstract function doNewConnect($newSocket);
	abstract function doGetMessage($msg);
	abstract function doLoseConnect($loseSocket);
	
	function WebSocketServer($host, $port) {
		parent::SocketServer($host, $port);
	}
	
	function newConnect($newSocket) {
		$header = socket_read($newSocket, 1024);
		WebSocketServer::handshaking($header, $newSocket, $this->host, $this->port);
		$this->doNewConnect($newSocket);
	}
	
	function socketChanged($socket) {
		while(socket_recv($socket, $buf, 1024, 0) >= 1) {
			$received_text = WebSocketServer::unmask($buf); //unmask data
			$this->doGetMessage($received_text);
			return AbstractSocketServer::$INCOMING_DATA;
		}
			
		$buf = @socket_read($socket, 1024, PHP_NORMAL_READ);
		if ($buf === false) { // check disconnected client
			// remove client for $clients array
			$found_socket = array_search($socket, $this->clients);
			unset($this->clients[$found_socket]);
			$this->doLoseConnect($socket);
			return AbstractSocketServer::$LOSE_CONNECT;
		}
	}
	
	public function send($msg) {
		$this->response(WebSocketServer::mask($msg));
		return true;
	}
	
	//handshake new client.
	public static function handshaking($receved_header,$client_conn, $host, $port) {
		$headers = array();
		$lines = preg_split("/\r\n/", $receved_header);
		foreach($lines as $line) {
			$line = chop($line);
			if(preg_match('/\A(\S+): (.*)\z/', $line, $matches))
			{
				$headers[$matches[1]] = $matches[2];
			}
		}
	
		$secKey = $headers['Sec-WebSocket-Key'];
		$secAccept = base64_encode(pack('H*', sha1($secKey . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')));
		//hand shaking header
		$upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
				"Upgrade: websocket\r\n" .
				"Connection: Upgrade\r\n" .
				"WebSocket-Origin: $host\r\n" .
				"WebSocket-Location: ws://$host:$port/\r\n".
				"Sec-WebSocket-Accept:$secAccept\r\n\r\n";
		socket_write($client_conn,$upgrade,strlen($upgrade));
	}
	
	//Unmask incoming framed message
	public static function unmask($text) {
		$length = ord($text[1]) & 127;
		if($length == 126) {
			$masks = substr($text, 4, 4);
			$data = substr($text, 8);
		}
		elseif($length == 127) {
			$masks = substr($text, 10, 4);
			$data = substr($text, 14);
		}
		else {
			$masks = substr($text, 2, 4);
			$data = substr($text, 6);
		}
		$text = "";
		for ($i = 0; $i < strlen($data); ++$i) {
			$text .= $data[$i] ^ $masks[$i%4];
		}
		return $text;
	}
	
	//Encode message for transfer to client.
	public static function mask($text) {
		$b1 = 0x80 | (0x1 & 0x0f);
		$length = strlen($text);
	
		if($length <= 125)
			$header = pack('CC', $b1, $length);
		elseif($length > 125 && $length < 65536)
		$header = pack('CCn', $b1, 126, $length);
		elseif($length >= 65536)
		$header = pack('CCNN', $b1, 127, $length);
		return $header.$text;
	}
}