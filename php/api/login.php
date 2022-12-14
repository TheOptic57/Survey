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

ini_set('display_errors', 1);

// Will contain config variables
//$configs = include("../config.php");
// Normal errors are generated instead of exceptions.
mysqli_report(MYSQLI_REPORT_ALL ^ MYSQLI_REPORT_INDEX);

$in_data = get_request_info();

$connection = new mysqli('139.144.19.56', 'Jesse', 'Password123!', 'SurveyProject');

// Database connection test
if($connection->connect_error)
{
    send_JSON_error($connection->connect_error);
    exit();
}

//i - integer, d - double, s - string, b - BLOB
$statement = $connection->prepare("SELECT email FROM Users WHERE email = ? AND password = ?;"); // May need to change email & password to variables in DB
$statement->bind_param("ss", $in_data["email"], $in_data["password"]);
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

?>