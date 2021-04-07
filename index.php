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
	<meta name="viewport"
	content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Даб 1</title>
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
<body id="hostAppCompile">
	<?php
		foreach($sourсes as $sourсe)
		{
			if(preg_match("#(.*)\\.html#", $sourсe))
			{
				require $sourсe;
			}
		}
	?>
</body>
</html>
