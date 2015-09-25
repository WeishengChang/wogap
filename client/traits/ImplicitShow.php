<?php

trait ImplicitShow {
	public function getTotal($table, $filter) {
		return  DBC::queryOneCell("
			SELECT COUNT(*)
			FROM {$table}
			WHERE {$filter}
		");
	}
}