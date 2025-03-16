<?php

defined('ROOT')
|| define('ROOT', __DIR__ . DIRECTORY_SEPARATOR . 'php');
require_once 'vendor/autoload.php';
date_default_timezone_set('Asia/Shanghai');
include ROOT . '/configs/di.php';
if (DI()->debug) {
	error_reporting(E_ALL);
	ini_set('display_errors', 'On');
}
defined('SITE_NAME')
|| define("SITE_NAME", $_ENV['SITE_NAME']);
