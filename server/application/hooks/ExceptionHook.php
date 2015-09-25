<?php
class ExceptionHook 
{
	public function SetExceptionHandler()
	{
		set_exception_handler(array($this, 'HandleExceptions'));
	}

	public function HandleExceptions($exception)
	{
		if($exception instanceof Alert) {
			header(' ', true, 406);
			echo json_encode(['status'=>'error', 'msg'=>(string) $exception]);
			exit;
		}
		echo $exception;
		exit;
	}
}
class Alert extends Exception {
	public function __construct($message, $code = 0, Exception $previous = null) {
		parent::__construct($message, $code, $previous);
	}

	// custom string representation of object
	public function __toString() {
		return $this->message;
	}
}