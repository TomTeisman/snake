<?php

include "../DB.php";

if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    $score = intval($_POST['score']);
    $id = intval($_POST['id']);

    if (!empty($id)) {
        $db = new DB();
        $db->updateScore($_POST['score'], $id);
        
        header('Content-Type: application/json');
        echo json_encode(['id' => $id]);
    }
}