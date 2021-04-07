<?php
	function read_folder($folder)
	{
		$files = scandir($folder);
		$out = [];
		foreach($files as $file)
		{
			if ($file == '.' || $file == '..') continue;
			$fullfilename = $folder . '/' . $file;
			if (is_dir($fullfilename))
				$out = array_merge($out, read_folder($fullfilename));
			else
				array_push($out, $fullfilename);
		}
		return $out;
	}

	$sourсes = read_folder("apps");
?>
<!doctype html>
<html lang="ru" xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="UTF-8">
	<title>Front</title>
	<link rel="stylesheet" href="css/style.css">
	<script src="js/initFunctions.js" defer></script>
	<script src="js/vue.js" defer></script>
	<script src="js/main.js" defer></script>
	<?php
	foreach($sourсes as $sourсe)
	{
		if(preg_match("/(.*)\\.js/", $sourсe))
		{
			echo "<script src='$sourсe' defer></script>";
		}
	}
	?>
</head>
<body>
	<nav>
		<h2>Меню</h2>
		<ul>
			<?php
				foreach($sourсes as $sourсe)
				{
					$matches = [];
					if(preg_match("#apps/(.*)/(.*)\\.html#", $sourсe, $matches))
					{
						?>
						<li>
							<button onclick='global.state = "<?=$matches[1]?>"'>
								<?=$matches[1]?>
							</button>
						</li>
						<?php
					}
				}
			?>
		</ul>
	</nav>
	<div id="hostAppCompile">
		<?php
			foreach($sourсes as $sourсe)
			{
				$matches = [];
				if(preg_match("#apps/(.*)/(.*)\\.html#", $sourсe, $matches))
				{
					echo "<div v-if='state === \"$matches[1]\"'>";
					require $sourсe;
					echo "</div>";
				}
			}
		?>
	</div>
</body>
</html>
