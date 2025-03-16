<?php

require_once dirname(__FILE__) . '/init.php';

try {
	require_once ROOT . '/configs/routes.php';
} catch (\Throwable $th) {
	echo $th->getMessage();
	echo '<br>';
	echo $th->getTraceAsString();
	exit(0);
}
