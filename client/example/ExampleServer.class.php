<?php
require_once dirname(__FILE__).'/../socket/WebSocketServer.class.php';

class ExampleServer extends WebSocketServer {
	public function doNewConnect($newSocket) {
		socket_getpeername($newSocket, $ip); //get ip address of connected socket
		$this->send(json_encode(array('type'=>'system', 'message'=>$ip.' connected'))); //notify all users about new connection
	}

	public function doLoseConnect($loseSocket) {
		socket_getpeername($loseSocket, $ip);
		//notify all users about disconnected connection
		$this->send(
				json_encode(array('type'=>'system', 'message'=>$ip.' disconnected'))
		);
	}

	public function doGetMessage($msg) {
		$tst_msg = json_decode($msg); //json decode
		$user_name = $tst_msg->name; //sender name
		$user_message = $tst_msg->message; //message text
		$user_color = $tst_msg->color; //color

		$this->send(
				json_encode(array('type'=>'usermsg', 'name'=>$user_name, 'message'=>$user_message, 'color'=>$user_color))
		); //send data
	}
}