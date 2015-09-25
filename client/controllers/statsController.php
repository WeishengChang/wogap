<?php
class statsController extends Controller {
	public final function barsBasics() {
		//回傳分成10級的數值統計資料
		$field = filter_input(INPUT_POST, 'field', FILTER_SANITIZE_STRING);
		switch($field) {
			case '現金':
				//TODO: 蒐集全體存款資料(百分級距)
				$data = statsModel::general('wog_player', 'p_money');
				break;
			case '存款':
				//TODO: 蒐集全體存款資料(百分級距)
				$data = statsModel::general('wog_player', 'p_bank');
				break;
			case '財富':
				//蒐集現金與存款資料
				$data = array(
						statsModel::general('wog_player', 'p_money'),
						statsModel::general('wog_player', 'p_bank')
				);
				break;
			default:
				alert("Wrong field {$field}");
				break;
		}
		return $data;
	}
}
?>