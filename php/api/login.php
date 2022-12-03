<?php

/*
// Will contain utility functions
include_once("../util.php");

ini_set('display_errors', 1);

// Will contain config variables
$configs = include("../config.php");
// Normal errors are generated instead of exceptions.
mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);

$in_data = get_request_info();

$connection = new mysqli($configs['db_host'],
                   $configs['db_username'],
                   $configs['db_password'],
                   $configs['db_name']);

// Database connection test
if($connection->connect_error)
{
    send_JSON_error($connection->connect_error);
    exit();
}

//i - integer, d - double, s - string, b - BLOB
$statement = $connection->prepare("SELECT Id, FirstName, LastName FROM Users WHERE email = ? AND password = ?;"); // May need to change email & password to variables in DB
$statement->bind_param("ss", $in_data["username"], $in_data["password"]);
$statement->execute();
$result = $statement->get_result();

// Check for response from DB
if($row = $result->fetch_assoc()) // Fetches a result row as an associative array.
{
    send_JSON_response($row);
}

// If no response, then send error response
else 
{
    send_JSON_error("No Records Found");
}

// Close DB connections
$statement->close();
$connection->close();
*/
?>