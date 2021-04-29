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
			$subject = $_POST['deleteasubject'];
			$subject = strtolower($subject);

			$conn = new mysqli('localhost','root','','routine');

			if($conn -> connect_error)
			{
				//echo "Something is woring";
			}
			else
			{
                //$stmt = "SELECT * FROM allsubject WHERE `subject`= '$subject'";
                $stmt = "DELETE FROM allsubject WHERE `subject`= '$subject'";
                if(mysqli_query($conn, $stmt))
                {
                    $stmt = "DELETE FROM routine_data WHERE `subject`= '$subject'";
                    mysqli_query($conn, $stmt);
                    echo "<h1>{$subject} is deleted duccessfully..</h1>";
                }
                else
                {
                   echo "Not Possible to Delete";
                }
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
