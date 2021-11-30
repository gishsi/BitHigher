<?php

/**
 * Read a user upon reaching this endpoint
 * @author: Julia Drozdz
 */

// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require '../server/get_db_handle_path.php';
require GET_DB_HANDLE_PATH . "/get_db_handle.php";
require_once '../server/queries.php';

try {
    // With fetch API we need to access the raw data from the request body (see references)
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    $result = readUser(get_db_handle(), $data->username);

    $num = $result->rowCount();
    if ($num > 0) {
        // echo $row['name'] . " | " . $row['email'] . "\n";
        // extract allows us to use column names  as variables
        extract($result->fetch(PDO::FETCH_ASSOC));

        $user = (object)array(
            'name' => $name,
            'score' => $score,
            'difficulty' => $difficulty,
            'hero' => $hero
        );
        // return a json encoded array for the fetch API to read
        echo json_encode($user);
    } else {
        echo json_encode(
            array('message' => "User does not exist.")
        );
    }
} catch (Exception $e) {
    echo "Could not fetch the user: " . $e->getMessage();
}
