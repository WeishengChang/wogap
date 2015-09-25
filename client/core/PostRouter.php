<?php
// 預設的路由器
class PostRouter extends Router
{
	// 預設的動作
	protected $action = 'show';
	protected $folk = 'index';
	// 在建構函式中解析 GET 變數
	public function __construct()
	{
		$this->folk = isset($_POST['f']) ? strtolower($_POST['f']) : 'index';
		$this->action = isset($_POST['act']) ? strtolower($_POST['act']) : 'show';
	}
	// 取得解析後的動作名稱
	public function getFolk()
	{
		return $this->folk;
	}
	public function getAction()
	{
		return $this->action;
	}
}
?>