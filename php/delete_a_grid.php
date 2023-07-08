<?php
    $configs = include('conf.php');

    try {
        $connection = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                                $configs->DB_USERNAME, 
                                $configs->DB_PASSWORD);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if (isset($_POST['gridId'])) {
            $gridId = $_POST['gridId'];

            $updateUserQuery = "UPDATE users SET grid_id = NULL WHERE grid_id = :gridId";
            $updateUserStmt = $connection->prepare($updateUserQuery);
            $updateUserStmt->bindParam(':gridId', $gridId);
            $updateUserStmt->execute();

            $updateUserQuery2 = "UPDATE users SET grid_id_2 = NULL WHERE grid_id_2 = :gridId";
            $updateUserStmt2 = $connection->prepare($updateUserQuery2);
            $updateUserStmt2->bindParam(':gridId', $gridId);
            $updateUserStmt2->execute();

            $deleteGridQuery = "DELETE FROM grids WHERE id = :gridId";
            $deleteGridStmt = $connection->prepare($deleteGridQuery);
            $deleteGridStmt->bindParam(':gridId', $gridId);
            $deleteGridStmt->execute();

            $response = [
                'success' => true,
                'message' => 'Grid deleted successfully'
            ];
        } else {
            $response = [
                'success' => false,
                'message' => 'Grid ID not provided'
            ];
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    } catch (PDOException $e) {
        $response = [
            'success' => false,
            'message' => 'Failed to delete grid: ' . $e->getMessage()
        ];

        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>
