<?php
abstract class Controller {
	protected $act = null;
	protected $view = 'JSONView';
	public function __construct($act) {
		$this->act = isset($act) ? strtolower($act) : null;
	}
	
	private final function setView($name) {$this->view = $name;}
	private final function getView() {return $this->view;}
	
	public final function run() {
		ob_start();
		$data = $this->{$this->act}();
		//蒐集錯誤輸出
		if(ob_get_length() > 0) {
			alert(ob_get_contents());
		}
		if(!isset($data)) {
			alert('Unspecified response.');
		}
		//TODO: include & render JSONView
		$viewName = $this->view;
		$view = $viewName::render($data);
	}
	public final function parseDataInFormat($data, $format = null, $separator = ',') {
		if(is_null($format)) {
			return $data;
		} else {
			$format = explode($separator, $format);
			$data = explode($separator, $data);
			$result = array();
			foreach($format as $k=>$v) {
				$result[$v] = isset($data[$k]) ? $data[$k] : "" ;
			}
			return $result;
		}
	}
	public final function getID($format = null, $separator = ',') {
		$id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING);
		return $this->parseDataInFormat($id, $format, $separator);
	}
}
?>