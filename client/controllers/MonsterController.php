<?php
class MonsterController extends ImplicitWOGController {
	public function show() {
		//取得頁數資訊
		//控制參數
		$qlimit = array();
		$modelName = $this->getModelName();
		$model = new $modelName();
		$searchSQL = self::getJQGridSearchParams();
		//echo($searchSQL);
		$id = filter_input(INPUT_GET, 'row_id', FILTER_SANITIZE_NUMBER_INT);
		if($id) {
			//$id = $this->parseDataInFormat($id, 'd_id');
			$qlimit[] = 'a.m_id='.$id;
		}
		if($searchSQL) {
			$qlimit[] = $searchSQL;
		}
		$qlimit = self::implodeQueryFilters($qlimit);
		return $model->getJQGridGridData($qlimit, array(
				'SQL_SELECT' => 'a.m_id, a.m_name, a.m_sat_name, a.s_property, a.m_img,
					a.m_place, a.m_subplace, a.m_lv, a.m_meet, a.m_mission, b.m_subject,
					a.m_npc, a.m_npc_message, a.hp, a.sp, a.at, a.df, a.mat, a.mdf,
					a.str, a.smart, a.agi, a.life, a.vit, a.au, a.be, 
					a.skill_1, a.skill_2, a.skill_3, a.skill_4, a.skill_5, 
					a.time_1, a.time_2, a.time_3, a.m_job_Exp, a.d_id, a.m_topr
				',
				'SQL_FROM' => 'wog_monster a LEFT JOIN wog_mission_main b ON b.m_id=a.m_mission',
				'sanitize' => array('MonsterController', 'sanitizeShowData'),
				//'idName' => 'id'
		));
	}
	public static function sanitizeShowData($d) {
		if($d['m_mission'] == 0) {
			$d['m_subject'] = '無';
		}
		return $d;
	}
}
