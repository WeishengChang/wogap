<?php
header('Cache-control:no-cache');
class WOGEditor extends CI_Controller {
	protected $rules = [];
	public function _switch($str) {
		return in_array($str, ['1', '']) ?TRUE:FALSE;
	}
	
	protected function setupValidation() {
		$this->form_validation->set_rules($this->rules);
		$this->form_validation->set_message('_switch', '%s 的值並非開關的有效值(ON/OFF)');
	}
}