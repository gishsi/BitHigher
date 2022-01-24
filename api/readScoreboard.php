<?php

/** 
 * Read users from the database for the coreboard
 * @author: Julia Drozdz
 */
// Headers
// Since the request is going to be made from the same server, this could probably be omitted, but I decided to leave it anyway (CORS)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

require 'get_db_handle_path.php';
require GET_DB_HANDLE_PATH . "/get_db_handle.php";
require_once 'queries.php';
try {
    // Users
    $result = readScoreboard(get_db_handle());

    // Are there any users?
    $num = $result->rowCount();

    if ($num > 0) {
        $users = array();
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            // extract is an alternative to $row['name'];
            // extract allows us to use column names  as variables
            extract($row);
            $user = array(
                'name' => $name,
                'score' => $score,
                'difficulty' => $difficulty
            );
            // push the user to the data of the users array
            array_push($users, $user);
        }
        // return a json encoded array for the fetch API to read
        echo json_encode($users);
    } else {
        echo json_encode(
            array('message' => "No users in the database")
        );
    }
} catch (Exception $e) {
    echo "Could not get users: " . $e->getMessage();
}
