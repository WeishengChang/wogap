<?php

trait ImplicitController {
	private $modelName = null;
	function getModelName() {
		if($this->modelName === null) {
			$className = get_class($this);
			$tmp = explode('_', underscore($className));
			$prefix = pascal(implode('_', array_slice($tmp, 0, count($tmp)-1)));
			//echo $prefix;
			$this->modelName = $prefix.'Model';
		}
		return $this->modelName;
	}
}

