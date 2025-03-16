<?php

namespace Layouts;
class VueLayout
{
	public function __construct(
		public string $title = SITE_NAME,
		public string $lang = 'zh-CN'
	)
	{
		ob_start();
	}

	public function __destruct()
	{
		$output = ob_get_clean();

		ob_start();
		?>

		<!DOCTYPE html>
		<html lang="<?= $this->lang; ?>">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport"
				  content="width=device-width, initial-scale=1.0" />
			<title><?= $this->title; ?></title>
		</head>
		<body>
		<div id="app">
			<?= $output; ?>
		</div>
		<script type="application/javascript">
			const ENV = <?= json_encode([
				'siteName' => $_ENV['SITE_NAME'],
			]); ?>;
		</script>
		<script type="module" src="/src/main.ts"></script>
		</body>
		</html>
		<?php
		die(ob_get_clean());
	}
}
