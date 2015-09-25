<?php

class ImplicitWOGAPModel extends DataModel {
	use JQGrid;
	public $table;
	public function __construct($pks = array(), $load = false)
	{
		parent::__construct($this->table, $pks);
		if($load === true) {
			$this->load();
		}
	}
	public final function getTotal($filters) {
		return  DBC::queryOneCell("
			SELECT COUNT(*)
			FROM {$this->table} a
			WHERE {$filters}
		");
	}
}
