<?php
header('Content-type: application/json; charset:UTF-8');
header('Cache-control: no-cache');
echo json_encode($this->_ci_cached_vars);