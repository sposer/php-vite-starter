<?php

namespace Libs;

use Exception;

#[\AllowDynamicProperties]
class DependencyInjection
{
	private static $instance = null;

	private $services = [];
	private $shared = [];

	private function __construct()
	{
	}

	private function __clone()
	{
	}

	public static function one(): DependencyInjection
	{
		if (self::$instance === null) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	public function __set($name, $value)
	{
		$this->services[$name] = $value;
	}

	public function __get($name)
	{
		if (isset($this->services[$name])) {
			return $this->services[$name];
		}
		throw new Exception("Service '$name' not found.");
	}

	public function set($name, $value, $shared = false)
	{
		$this->services[$name] = $value;
		if ($shared) {
			$this->shared[$name] = $value;
		}
	}

	public function get($name)
	{
		if (isset($this->shared[$name])) {
			return $this->shared[$name];
		}
		if (isset($this->services[$name])) {
			return $this->services[$name];
		}
		throw new Exception("Service '$name' not found.");
	}

	public function call($name, $method, $params = [])
	{
		$service = $this->get($name);
		return call_user_func_array([$service, $method], $params);
	}
}
