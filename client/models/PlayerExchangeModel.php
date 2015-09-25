<?php
class PlayerExchangeModel extends ImplicitWOGAPModel {
	public $table = 'wog_exchange_list';
	public function validate(&$data, $single = false) {
		$p = DBC::queryOneAssoc("
			SELECT p_id
			FROM wog_player
			WHERE p_id={$data['p_id']}
		");
		if(!$p) alert('玩家不存在');
		$ex = DBC::queryOneAssoc("
			SELECT ex_id
			FROM wog_exchange_main
			WHERE ex_id={$data['ex_id']}
		");
		if(!$p) alert('資源不存在');
		$el = DBC::queryOneAssoc("
			SELECT el_id
			FROM wog_exchange_list
			WHERE ex_id={$data['ex_id']} AND p_id={$data['p_id']}
		");
		//新增已存在的p_id:ex_id pair或修改成已存在的p_id:ex_id pair時顯示錯誤
		if($el && (in_array(null, $this->pk, true) || $el['el_id'] != $this->pk['el_id'])) {
			alert('已有此資源');
		}
	}
}

PlayerExchangeModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'ex_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'el_amount' => array('filter'=>FILTER_SANITIZE_NUMBER_INT, 'options'=>array('min_range'=>0)),
	'el_money' => array('filter'=>FILTER_SANITIZE_NUMBER_FLOAT)
));
?>