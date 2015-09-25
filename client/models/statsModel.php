<?php
class statsModel {
	public static function general($table, $field, $mode = STAT_MODE_DIVISION, $num = 100) {
		//通用查詢格式: 對於特定資料表內單一欄位，所有資料的統計數據
		//0: plot data
		//1: 樣本數
		//2: 極小值
		//3: 極大值
		//4: 均值
		//5: 四分位數 array(Q1, Q2, Q3)
		//6: 
		$data = array(
			'data' => array(), 
			'samples' => null, 
			'min' => null, 
			'max' => null,
			'mean' => null,
			'q1' => null,
			'q2' => null,
			'q3' => null
			);
		switch($mode) {
			case STAT_MODE_DIVISION:
				//先辨識人數是否小於$num，小於時要特別處理
				$cnt = DBC::queryOneCell('
					SELECT COUNT('.$field.')
					FROM '.$table.'
					');
				if($cnt < $num) {
					$tmpdata = DBC::queryAllRow('
						SELECT '.$field.'
						FROM '.$table.'
						ORDER BY '.$field.' ASC
					');
					//延展至$num個資料
					$i = 0;
					$step = ($cnt-1)/$num;
					do {
							$index = ceil($step*$i);
						$data['data'][$i] = $tmpdata[$index][0];
					} while(++$i < $num);
				} else {
					$i = 0;
					$step = $cnt/$num;
					do {
						$index = ceil($i*$step);
						$tmpdata = DBC::queryOneCell("
							SELECT ".$field."
							FROM ".$table."
							ORDER BY ".$field." ASC
							LIMIT {$index}, 1
							");
						$data['data'][$i] = $tmpdata;
					} while(++$i < $num);
				}
				$data['samples'] = $cnt;
				$stats = DBC::queryOneRow('
					SELECT MIN('.$field.'), MAX('.$field.'), AVG('.$field.')
					FROM '.$table.'
				');
				$data['min'] = $stats[0];
				$data['max'] = $stats[1];
				$data['mean'] = $stats[2];
				//計算四分位數 BEGIN
				$q = array($data['max']*0.25, $data['max']*0.5, $data['max']*0.75);
				for($i = 0; $i < 3; ++$i) {
					if(is_int($q[$i])) {
						$data['q'.($i+1)] = DBC::queryOneCell('
							SELECT AVG('.$field.')
							FROM '.$table.'
							ORDER BY '.$field.' ASC
							LIMIT '.$q[$i].', 2
						');
					}
					if(is_float($q[$i])) {
						$data['q'.($i+1)] = DBC::queryOneCell('
							SELECT '.$field.'
							FROM '.$table.'
							ORDER BY '.$field.' ASC
							LIMIT '.ceil($q[$i]).', 1
						');
					}
				}
				//計算四分位數 END
				return $data;
				break;
		}
		return null;
	}
}
?>