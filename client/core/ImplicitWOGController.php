<?php

class ImplicitWOGController extends Controller {
	use ImplicitController, ImplicitJQGridController, SQLTools, JQGrid;
	public function __construct() {
		call_user_func_array(array('parent', '__construct'), func_get_args());
	}
	public final function edit() 
	{
		//新增 & 更新 & 刪除玩家資料
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		$modelname = $this->getModelName();
		$model = new $modelname;
		$id = call_user_func_array(array($this, 'getID'), $model->getPrimaryKeyList());
		$this->dispatchOperation($modelname, $id);
		return true;
	}
}
