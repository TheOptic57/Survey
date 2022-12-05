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

// Get query data : (Parameters [ID] [PAGE] [SEARCH])
$in_data = get_request_info(); // get_query_params();

// Connect to database
$connection = new mysqli('139.144.19.56', 'Jesse', 'Password123!', 'SurveyProject');

// Database connection test
if($connection->connect_error)
{
    send_JSON_error($connection->connect_error);
    exit();
}

$statement = $connection->prepare("SELECT Title, Description, Sid, Start_Date, End_Date, email FROM Survey WHERE email = ?");

$statement->bind_param("s", $in_data["email"]);
$statement->execute();
$result = $statement->get_result();
    
$search_results = array();
$count = 0;
while($row = $result->fetch_assoc()) {
    array_push($search_results, $row);
    $count++;
}

if($count == 0){
    send_JSON_error("Records Not Found!");
}
else {
    send_JSON_response($search_results); 
}

$statement->close();
$connection->close();
?>
