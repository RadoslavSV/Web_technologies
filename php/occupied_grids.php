<?php
    $configs = include('conf.php');

    try {
        $db = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                        $configs->DB_USERNAME, 
                        $configs->DB_PASSWORD);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die('Database connection failed: ' . $e->getMessage());
    }

    $occupiedGridsQuery = "SELECT * FROM grids";
    $occupiedGrids = $db->query($occupiedGridsQuery)->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($occupiedGrids);

    $db = null;
?>
