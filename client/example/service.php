<?php
//路徑自己橋好
require_once 'ExampleServer.class.php'; 
require_once '../socket/SocketCenter.class.php';

$server = new ExampleServer("localhost", "9000");
$socketCenter = new SocketServerCenter($server);
$socketCenter->run();

?>