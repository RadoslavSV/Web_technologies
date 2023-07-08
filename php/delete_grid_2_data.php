<?php
    $configs = include('conf.php');

    $db = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                    $configs->DB_USERNAME, 
                    $configs->DB_PASSWORD);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'];

        $stmt = $db->prepare('SELECT id, grid_id_2 FROM users WHERE username = :username');
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $gridId2 = $row['grid_id_2'];
        $userId = $row['id'];

        if (!$gridId2) {
            $response = array(
                'success' => false,
                'message' => 'No second grid data found for the selected user.'
            );
            echo json_encode($response);
            exit;
        }

        $stmt = $db->prepare('UPDATE users SET grid_id_2 = NULL WHERE username = :username');
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        $stmt = $db->prepare('DELETE FROM grids WHERE id = :gridId2');
        $stmt->bindParam(':gridId2', $gridId2);
        $stmt->execute();

        $rowCount = $stmt->rowCount();
        if ($rowCount > 0) {
            $response = array(
                'success' => true,
                'message' => 'Second grid data deleted successfully.'
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Failed to delete second grid data.'
            );
        }

        echo json_encode($response);
    } else {
        $response = array(
            'success' => false,
            'message' => 'Invalid request method.'
        );
        echo json_encode($response);
    }
?>
