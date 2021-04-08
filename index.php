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
	<script src="js/startInit.js" defer></script>
	<script src="js/vue.js" defer></script>
	<?php
	foreach($sourсes as $sourсe)
	{
		if(preg_match("/(.*)\\.js/", $sourсe))
		{
			echo "<script src='$sourсe' defer></script>";
		}
	}
	?>
	<script src="js/endInit.js" defer></script>
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
							<label for='<?=$matches[1]?>ShowBlock'>
								<?=$matches[1]?>
							</label>
						</li>
						<?php
					}
				}
			?>
		</ul>
	</nav>
	<div id="globalApp">
		<ol>
			<message v-for="message in messages" :key="message.id" :message="message"></message>
		</ol>
	</div>
	<?php
		foreach($sourсes as $sourсe)
		{
			$matches = [];
			if(preg_match("#apps/(.*)/(.*)\\.html#", $sourсe, $matches))
			{
				echo "<input type='radio' id='$matches[1]ShowBlock' name='state'><div>";
				require $sourсe;
				echo "</div>";
			}
		}
	?>
</body>
</html>
