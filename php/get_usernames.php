<?php
    $configs = include('conf.php');

    try {
        $connection = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                                $configs->DB_USERNAME, 
                                $configs->DB_PASSWORD);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $usernamesQuery = "SELECT username, grid_id, grid_id_2 FROM users";
        $stmt = $connection->query($usernamesQuery);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        header('Content-Type: application/json');
        echo json_encode($users);
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
?>
