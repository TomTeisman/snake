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
     * @param  int     $score
     * @param  string  $username
     */
    public function insertNewScore(int $score, string $username)
    {
        $statement = $this->pdo->prepare("INSERT INTO `scores` (`score`, `username`) VALUES (:score, :username);");
        $statement->bindParam(':score', $score, PDO::PARAM_INT);
        $statement->bindParam(':username', $username, PDO::PARAM_STR);
        $statement->execute();
        $id = $this->pdo->lastInsertId();
        return $id;
    }

    /**
     * Get all entries from the database
     */
    public function getScores()
    {
        $statement = $this->pdo->prepare("SELECT * FROM `scores` ORDER BY `score` DESC;");
        $statement->execute();
        
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * Update an entry in the database
     * 
     * @param  int  $score
     * @param  int  $id
     */
    public function updateScore(int $score, int $id)
    {
        $statement = $this->pdo->prepare("UPDATE `scores` SET `score` = :score WHERE `id` = :id");
        $statement->bindParam(':id', $id, PDO::PARAM_INT);
        $statement->bindParam(':score', $score, PDO::PARAM_INT);
        $statement->execute();
    }
}