<?php
$di = DI();

// 加载 .env 环境配置
$di->dotenv = Dotenv\Dotenv::createImmutable(ROOT . '/..');
// .env 非必须的加载
$di->dotenv->safeLoad();
// .env 必须的加载方式
// $di->dotenv->load();

$di->debug = $_ENV['DEBUG'];
