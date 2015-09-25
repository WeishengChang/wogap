<?php

trait ImplicitEdit {
	public function dispatchOperation($modelName, $pks, $options = array()) {
		$options = array_merge(array(
				'add' => true,
				'edit' => true,
				'del' => true,
				'extend' => array()
		), $options);
		$oper = filter_input(INPUT_POST, 'oper', FILTER_SANITIZE_STRING);
		switch(strtolower($oper)) {
			case 'add':
				if($options['add'] !== false) {
					$p = new $modelName;
					$p->update(filter_input_array(INPUT_POST));
				}
				break;
			case 'edit':
				if($options['edit'] !== false) {
					$p = new $modelName($pks);
					$p->update($_POST);
				}
				break;
			case 'del':
				if($options['del'] !== false) {
					$p = new $modelName($pks);
					$p->delete();
				}
				break;
			default:
				if(isset($options['extend'][$oper])) {
					call_user_func_array($options['extend']['$oper'], $pks);
				} else {
					alert('未知的行為:'.$oper);
				}
				break;
		}
	}
}
