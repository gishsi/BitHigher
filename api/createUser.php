<?php

/**
 * Create a user when reaching this endpoint
 * @author: Julia Drozdz
 */
require 'get_db_handle_path.php';
require GET_DB_HANDLE_PATH . "/get_db_handle.php";
require_once 'queries.php';

// The server needs to know what data to expect
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
try {
    // With the FetchAPI the $_POST or $_GET variables are empty (see references)
    // Instead we need to read the raw body of the request with a PHP wrapper
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $result = createUser(get_db_handle(), $data->username);
    echo json_encode("New user created");
} catch (Exception $e) {
    echo "Could not create a new user: " . $e->getMessage();
}
