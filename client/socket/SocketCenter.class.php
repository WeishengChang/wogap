<?php
class SocketServerCenter {
	private $allClients = array();
	private $socketServers;

	function SocketServerCenter($socketServers) {
		$this->socketServers = $socketServers;
		foreach ($socketServers as $socketServer) {
			$this->allClients[] = $socketServer->socket;
		}
	}

	public function run() {
		$null = NULL;
		while (true) {
			$changed = $this->allClients;
			socket_select($changed, $null, $null, 0, 10);
			
			foreach ($this->socketServers as $socketServer) {
				$socket = $socketServer->socket;
				if (in_array($socket, $changed)) {
					$newSocket = socket_accept($socket);
					$this->allClients[] = $newSocket;
					$socketServer->clients[] = $newSocket;
					$socketServer->newConnect($newSocket);
					$foundSocket = array_search($socket, $changed);
					unset($changed[$foundSocket]);
				}
			}
				
			foreach ($changed as $changedSocket) {
				foreach ($this->socketServers as $socketServer) {
					if (in_array($changedSocket, $socketServer->clients)) {
						switch ($socketServer->socketChanged($changedSocket)) {
						case AbstractSocketServer::$INCOMING_DATA :
							break 2;
						case AbstractSocketServer::$LOSE_CONNECT :
							$foundSocket = array_search($changedSocket, $this->allClients);
							unset($this->allClients[$foundSocket]);
							break;
						}
					}
				}
			}
		}
	}
}
