<?php

include "../DB.php";

$db = new DB();
$scores = $db->getScores();

header('Content-Type: application/json');

echo json_encode($scores);
