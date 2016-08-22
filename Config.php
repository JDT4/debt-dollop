<?php
//1509151415Config
	//config.php
	$server = 'localhost';
	$username = 'debtclockdbuser';
	$password = 'g6gTWwDuB@uK';
	$database = 'debtclock';

	date_default_timezone_set('Europe/London');
	$currentdate = date('Y-m-d H:i:s');

	if(!mysql_connect($server, $username,  $password))
	{
		exit('Error: could not establish database connection');
	}
	if(!mysql_select_db($database))
	{
		exit('Error: could not select the database');
	}
	else
	{
		$error = 0;

		//echo 'Hello!';
		$sql = "SELECT
				start_amount,
				end_amount,
				start_date,
				update_date,
				end_date,
				interest
			FROM
				variables";

		$result = mysql_query($sql);

		if(!$result)
		{
			//echo mysql_error();
			$error = 1;
			exit;
		}
		else
		{
			//do something
			$row = mysql_fetch_array($result);

			$start_amount = $row['start_amount'];
			$end_amount = $row['end_amount'];
			$interest = $row['interest'];

			//$start_date = strtotime($row['start_date']);
			//$update_date = strtotime($row['update_date']);
			//$end_date = strtotime($row['end_date']);
			$startdate = $row['start_date'];
			$updatedate = $row['update_date'];
			$enddate = $row['end_date'];

			$start_date = str_replace("-", "/", $startdate);
			$update_date = str_replace("-", "/", $updatedate);
			$end_date = str_replace("-", "/", $enddate);
			$current_date = str_replace("-", "/", $currentdate);

			//echo $start_amount.'<br/>'.$end_amount.'<br/>'.$interest.'<br/>'.$start_date.'<br/>'.$update_date.'<br/>'.$end_date.'<br/>'.$current_date;

		}
	}
?>
