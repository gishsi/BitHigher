<?php

/**
 * Performs a query to the user to fetch all user data, used by the readScoreboard.php file from the API endpoint
 * @author: Julia Drozdz
 */
function readScoreboard($conn)
{
    $table = "users";
    $query = "select * from users";
    try {
        $stmt = $conn->prepare($query);
        $stmt->execute();
        //echo $stmt;
        return $stmt;
    } catch (Exception $e) {
        echo "Caught exception" . $e->getMessage();
    }
}
/**
 * Performs a query to read a user from the databases, used by the readUser.php file from the API endpoint
 * @author: Julia Drozdz
 */
function readUser($conn, $name)
{
    $table = "users";
    $query = "SELECT * FROM " . $table . " WHERE name = :name";
    try {
        $stmt = $conn->prepare($query);
        // Alternative to bindParam
        $stmt->execute([
            ':name' => $name
        ]);
        return $stmt;
    } catch (Exception $e) {
        echo "Caught exception" . $e->getMessage();
    }
}
/**
 * Instert a user to the database, used by the createUser.php file from the API endpoint
 * @author: Julia Drozdz
 */
function createUser($conn, $name)
{
    $table = "users";
    $query = "INSERT INTO " . $table . " (name) VALUES (:name)";
    try {
        $stmt = $conn->prepare($query);
        $stmt->execute([
            ':name' => $name
        ]);
        return $stmt;
    } catch (Exception $e) {
        echo "Caught exception" . $e->getMessage();
    }
}
/**
 * Updates the user by name with a new variables for hero and difficulty, used by the updateUser.php file from the API endpoint
 * @author: Julia Drozdz
 */
function updateUser($conn, $preferences)
{
    $table = "users";
    $query = "UPDATE users SET hero=:hero, difficulty=:difficulty WHERE users.name = :name";
    try {
        $stmt = $conn->prepare($query);
        $stmt->execute([
            ':difficulty' => $preferences->difficulty,
            ':hero' => $preferences->hero,
            ':name' => $preferences->username
        ]);
        return $stmt;
    } catch (Exception $e) {
        echo "Caught exception" . $e->getMessage();
    }
}
/**
 * Updates the score by name with a new highest score, used by the updateScore.php file from the API endpoint
 * @author: Julia Drozdz
 */
function updateScore($conn, $user)
{
    $table = "users";
    $query = "UPDATE users SET score=:score  WHERE users.name = :name";
    try {
        $stmt = $conn->prepare($query);
        // alternative to bindParam
        $stmt->execute([
            ':score' => $user->score,
            ':name' => $user->username
        ]);
        return $stmt;
    } catch (Exception $e) {
        echo "Caught exception" . $e->getMessage();
    }
}
