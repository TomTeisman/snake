<?php
include 'DB.php';

$db = new DB();

$scores = $db->getScores();
?>

<!DOCTYPE html>
<html lang="nl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake</title>

    <!-- favicon -->
    <link rel="shortcut icon" href="assets/favicon.png" type="image/x-icon">

    <!-- styles -->
    <link rel="stylesheet" href="css/index.css">

    <!-- scripts -->
    <script src="js/game.js"></script>

    <!-- fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Asimovian&display=swap" rel="stylesheet">
</head>

<body onload="setup()">
    <div class="top-wrapper">
        <p>Position: #1</p>
        <h1>Snake</h1>
        <p class="score">Score: 0</p>
    </div>

    <div class="wrapper">
        <div class="scoreboard">
            <h2>Scoreboard</h2>
            <ol class="score-list">
                <?php
                if (!empty($scores)) {
                    $i = 0;
                    foreach ($scores as $score) {
                        if ($i < 10) {
                            echo "<li>" . $score['score'] . "</li>";
                            $i++;
                        }
                    }
                }
                ?>
            </ol>
        </div>

        <div class="game-wrapper">
            <canvas id="game" width="600" height="600"></canvas>
            <p id="countdown">3</p>
            <div class="game-over">
                <h2>Game over!</h2>
                <p class="final-score">Score: 0</p>
                <button onclick="location.reload()">Retry</button>
            </div>
        </div>
    </div>
</body>

</html>