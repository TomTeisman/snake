<?php

include "../DB.php";

if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    $score = $_POST['score'];

    if ($score > 0) {
        $db = new DB();
        $id = $db->insertNewScore($_POST['score'], $_POST['username']);
        
        header('Content-Type: application/json');
        echo json_encode(['id' => $id]);
    }
}