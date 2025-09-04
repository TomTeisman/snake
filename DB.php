<?php

class DB
{
    const HOST = '127.0.0.1';
    const DBNAME = 'snake_game';
    const USERNAME = 'root';
    const PASSWORD = '';
    private $pdo;

    /**
     * Class construct
     */
    public function __construct()
    {
        try {
            $this->pdo = new PDO('mysql:host=' . self::HOST . ';dbname=' . self::DBNAME, self::USERNAME, self::PASSWORD);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die($e->getMessage());
        }
    }

    /**
     * Add a new entry to the database
     * 
     * @param  int  $score
     */
    public function insertNewScore(int $score)
    {
        $statement = $this->pdo->prepare("INSERT INTO `scores` (`score`) VALUES (:score);");
        $statement->bindParam(':score', $score, PDO::PARAM_INT);
        $statement->execute();
    }

    /**
     * Get all entries from the database
     */
    public function getScores()
    {
        $statement = $this->pdo->prepare("SELECT * FROM `scores` ORDER BY `score` DESC;");
        $statement->execute();
        return $statement->fetchAll();
    }
}