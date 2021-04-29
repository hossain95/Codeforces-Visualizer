<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>personal routine</title>
		<link rel="stylesheet" href="style.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	</head>
	<body style="text-align:center;">
		<!--Header Start-->
		<header>
			<div class="left">
				<ul>
					<li><a onclick="loader()" href="index.html" >Home</a></li>
				</ul>
			</div>
			<div class="right">
				<ul>
					<li><a onclick="loader()" href="index.html" >Add Subject</a></li>
					<li><a onclick="loader()" href="index.html" >Insert Time</a></li>
				</ul>
			</div>
		</header>
		<!--Header End-->
		<?php
			$subject = $_POST['addnewsubject'];
			$subject = strtolower($subject);

			$conn = new mysqli('localhost','root','','routine');
			if($conn -> connect_error)
			{
				//echo "Something is woring";
			}
			else
			{
				$stmt = $conn->prepare("insert into allsubject(subject) values(?)");
				$stmt -> bind_param("s", $subject);
				$stmt -> execute();
				echo "<h1>{$subject} is add successfully..</h1>";
				$stmt->close();
				$conn->close();
			}
		?>
		<div id ="loaddiv">

		</div>
		<script>
			function loader()
			{
				$( "#loaddiv").load("jsonDataForSubject.php");
				$( "#loadhere").load("index.html");
			}
		</script>
</body>
