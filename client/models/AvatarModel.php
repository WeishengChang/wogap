<?php
class AvatarModel extends ImplicitWOGAPModel {
	public $table = 'wog_img';
}

AvatarModel::setParams(array(
	'i_id' => array('filter'=>FILTER_SANITIZE_NUMBER_INT),
	'i_filename' => array('filter'=>FILTER_SANITIZE_STRING)
));
?>