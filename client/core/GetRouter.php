<?php
// 預設的路由器
class GetRouter extends Router
{
	// 預設的動作
	protected $action = 'show';
	protected $folk = 'index';
	// 在建構函式中解析 GET 變數
	public function __construct()
	{
		$this->folk = isset($_GET['f']) ? strtolower($_GET['f']) : 'index';
		$this->action = isset($_GET['act']) ? strtolower($_GET['act']) : 'show';
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