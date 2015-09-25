<?php
require_once 'WOGEditor.php';
class Player extends WOGEditor {
	protected $rules = [
			['field'=> 'p_id', 'label' => 'ID', 'rules' => ''],
			['field'=> 'p_name', 'label' => '名稱', 'rules' => 'trim|required|min_length[1]|max_length[10]'],
			['field'=> 'p_password', 'label' => '密碼', 'rules' => 'trim|required|min_length[1]|max_length[20]'],
			['field'=> 'p_email', 'label' => '信箱', 'rules' => 'trim|valid_email'],
			['field'=> 'p_ipadd', 'label' => 'IP', 'rules' => 'trim'],
			['field'=> 'p_act_time', 'label' => '行動時間', 'rules' => 'trim|numeric'],
			['field'=> 'act_num', 'label' => '行動值', 'rules' => 'trim|numeric'],
			['field'=> 'act_num_time', 'label' => '行動值時間', 'rules' => 'trim|numeric'],
			['field'=> 'p_lock_time', 'label' => '封鎖時間', 'rules' => 'trim|numeric'],
			['field'=> 'p_st', 'label' => 'VIP', 'rules' => 'callback__switch'],
			['field'=> 'p_userlv', 'label' => '信箱', 'rules' => 'trim|numeric'],
			['field'=> 'p_lock', 'label' => '封鎖', 'rules' => 'callback__switch'],
			['field'=> 'p_npc', 'label' => 'NPC', 'rules' => 'callback__switch'],
			['field'=> 's_property', 'label' => '信箱', 'rules' => 'trim|numeric'],
			['field'=> 'hp', 'label' => '信箱', 'rules' => 'trim|numeric'],
			['field'=> 'hpmax', 'label' => '信箱', 'rules' => 'trim|numeric'],
			['field'=> 'sp', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'spmax', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'ch_id', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_money', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_bank', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_cash', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'str', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'smart', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'agi', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'life', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'vit', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'au', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'be', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'base_str', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'base_smart', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'base_agi', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'base_life', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'base_vit', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'base_au', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'base_be', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'at', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'df', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'mat', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'mdf', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_exp', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_nextexp', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_lv', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_birth', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_place', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_sat_name', 'label' => '', 'rules' => 'trim'],
			['field'=> 'p_win', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_lost', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_sex', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_img_set', 'label' => '', 'rules' => 'callback__switch'],
			['field'=> 'p_img_url', 'label' => '', 'rules' => 'trim'],
			['field'=> 'p_pk_s', 'label' => '', 'rules' => 'callback__switch'],
			['field'=> 'p_pk_money', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_bag', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_depot', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_cp_st', 'label' => '', 'rules' => 'callback__switch'],
			['field'=> 'p_cp_time', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'i_img', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_g_id', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 't_id', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_support', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_recomm', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_attempts', 'label' => '', 'rules' => 'trim'],
			['field'=> 'p_cdate', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_online_time', 'label' => '', 'rules' => 'trim|numeric'],
			['field'=> 'p_bbsid', 'label' => '', 'rules' => 'trim|numeric'],
		];
	public function __construct() {
		parent::__construct();
		$this->load->model('Player_model');
	}
	
	public function show() {
		//$data = ['total'=>0, 'rows'=>[]];
		$data = $this->Player_model->getList([
			'page' => $this->input->post("page"),
			'rows' => $this->input->post("rows"),
			'sort' => $this->input->post("sort"),
			'order' => $this->input->post("order")
		]);
		$this->load->view('json', $data);
	}
	
	public function add() {
		$this->load->library('form_validation');
		$this->setupValidation();
		if($this->form_validation->run() === FALSE) {
			throw new Alert(validation_errors());
		}
		$this->Player_model->update($this->input->post(NULL, TRUE));
		$this->load->view('json', ['msg'=>'新增成功']);
	}
	public function edit() {
		$this->load->library('form_validation');
		$this->rules[0]['rules'] = 'trim|required|numeric';
		$this->setupValidation();
		if($this->form_validation->run() === FALSE) {
			throw new Alert(validation_errors());
		}
		$this->Player_model->update($this->input->post(NULL, TRUE));
		$this->load->view('json', ['msg'=>'編輯成功']);
	}
}