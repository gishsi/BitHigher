<?php

/**
 * Update the score endpoint
 * @author: Julia Drozdz
 */
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require '../server/get_db_handle_path.php';
require GET_DB_HANDLE_PATH . "/get_db_handle.php";
require_once '../server/queries.php';

try {
    // With the FetchAPI the $_POST or $_GET variables are empty (see references)
    // Instead we need to read the raw body of the request with a PHP wrapper
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $result = updateScore(get_db_handle(), $data);
    echo json_encode("User updated");
} catch (Exception $e) {
    echo "Could not create a new user: " . $e->getMessage();
}
