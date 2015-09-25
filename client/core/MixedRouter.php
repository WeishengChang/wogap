<?php

class MixedRouter extends Router 
{
	// 預設的動作
	protected $action = 'show';
	protected $folk = 'index';
	// 在建構函式中解析 GET 變數
	public $toLower = false;
	public function __construct()
	{
		if( isset($_GET['f']) || isset($_GET['act']) )
		{
			$this->folk = isset($_GET['f']) ? $_GET['f'] : 'index';
			$this->action = isset($_GET['act']) ? $_GET['act'] : 'show';
		}
		elseif(isset($_POST['f']) || isset($_POST['act']))
		{
			$this->folk = isset($_POST['f']) ? $_POST['f'] : 'index';
			$this->action = isset($_POST['act']) ? $_POST['act'] : 'show';
		}
	}
	// 取得解析後的動作名稱
	public function getFolk()
	{
		return $this->toLower ? strtolower($this->folk) : $this->folk;
	}
	public function getAction()
	{
		return $this->toLower ? strtolower($this->action)  :$this->action;
	}
}
?>