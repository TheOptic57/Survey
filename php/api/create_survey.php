<?php
// Will contain utility functions
include_once("../util.php");

// Show errors
ini_set('display_errors', 1);

// Will contain config variables
$configs = include("../config.php");
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

$statement = $connection->prepare("INSERT INTO Users (email, password) VALUES (?, ?);");
$statement->bind_param("ss", $in_data["email"], $in_data["password"]);

// If statement is successful, then return JSON response
if($statement->execute()) {
    send_JSON_response("User account created!"); 
}

// Otherwise, error has occured
else {
    send_JSON_error($statement->error);
}

$statement->close();
$connection->close();
?>