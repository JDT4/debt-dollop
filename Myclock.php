<?php
//CHECK THE CONFIG FILE

// Include twitteroauth
require_once('twitteroauth.php');
require_once('/var/www/vhosts/core55.org/debtclock/admin/config.php');

// Set keys


// Create object
$tweet = new TwitterOAuth($consumerKey, $consumerSecret, $accessToken, $accessTokenSecret);

// new method
date_default_timezone_set('Europe/London'); //override server timezone
$start = strtotime('2015-04-05 00:00:00');
$end = strtotime('2016-04-05 00:00:00');
$current = strtotime(date('Y-m-d H:i:s'));

// set amounts
$startamount = 1479000000000;  //1.479tn
$endamount = 1676000000000;   //1.676tn

$increase = $endamount - $startamount;
$duration = $end - $start;
$increment = ($increase / $duration);
$elapsed = ($current - $start);
$currentdebt_raw = ($startamount + ($increment * $elapsed));
$currentdebt = number_format($currentdebt_raw);

$message = '£'.$currentdebt.' // current UK Public Sector Net Debt // http://debt-clock.org';



// Check for 140 characters
if(strlen($message ) <= 140)	
{
    // Post the status message
	    $tweet->post('statuses/update', array('status' => $message_2));
	}
?>
