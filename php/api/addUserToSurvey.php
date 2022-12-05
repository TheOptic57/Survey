<?php
function get_request_info()
{
    return json_decode(file_get_contents('php://input'), true);
}

function get_query_params() {
    $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    // Use parse_url() function to parse the URL
    // and return an associative array which
    // contains its various components
    $url_components = parse_url($url);

    // Use parse_str() function to parse the
    // string passed via URL
    parse_str($url_components['query'], $params);
        
    return $params;
}

function send_JSON_response($obj)
{
    header('Content-type: application/json');

    $payload = array('response' => $obj, 'status' => "success");

    echo json_encode($payload);
}

function send_JSON_error($err)
{
    header('Content-type: application/json');
    
    $payload = array('message' => $err, 'status' => "failure");

    echo json_encode($payload);
}

// Will contain utility functions
//include_once("../util.php");

// Show errors
ini_set('display_errors', 1);

// Will contain config variables
//$configs = include("../config.php");
mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX); // generates normal errors instead of exceptions

$in_data = get_request_info();

$connection = new mysqli('139.144.19.56', 'Jesse', 'Password123!', 'SurveyProject');

// Database connection test
if($connection->connect_error)
{
    send_JSON_error($connection->connect_error);
    exit();
}

$statement = $connection->prepare("INSERT INTO SurveyParticipator (email, Sid) VALUES (?, ?);");
$statement->bind_param("si", $in_data["email"], $in_data["Sid"]);

// If statement is successful, then return JSON response
if($statement->execute()) {
    send_JSON_response("Added user to Survey!"); 
}

// Otherwise, error has occured
else {
    send_JSON_error($statement->error);
}

$statement->close();
$connection->close();
?>