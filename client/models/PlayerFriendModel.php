<?php
class PlayerFriendModel extends ImplicitWOGAPModel {
	public $table = 'wog_friend_list';
	public function validate(&$data, $single = false) {
		if($data['p_id'] == $data['f_id']) {
			alert('不能將自己加為好友');
		}
		$p = DBC::queryOneAssoc("
			SELECT p_id
			FROM wog_player
			WHERE p_id={$data['p_id']}
		");
		if(!$p) alert('玩家不存在');
		$p = DBC::queryOneAssoc("
			SELECT p_id
			FROM wog_player
			WHERE p_id={$data['f_id']}
		");
		if(!$p) alert('好友不存在');
		$p = DBC::queryOneAssoc("
			SELECT p_id
			FROM wog_friend_list
			WHERE p_id={$data['p_id']} AND f_id={$data['f_id']}
		");
		if($p && (in_array(null, $this->pk, true) || $this->pk['p_id'] != $data['p_id'] || $this->pk['f_id'] != $data['f_id'])) {
			alert('已存在相同資料');
		}
	}
}

PlayerFriendModel::setParams(array(
	'p_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'f_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT)
));
?>