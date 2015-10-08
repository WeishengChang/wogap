<?php

class DBWOGMonster extends Eloquent {
		protected $table = 'wog_monster';
		protected $primaryKey = 'm_id';
		protected $guarded = [];
		public $timestamps = FALSE;
        public function mission() {
            return $this->belongsTo('DBWOGMission', 'm_mission')->select(['m_id', 'm_subject']);
        }
}