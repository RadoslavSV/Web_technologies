<?php
    $configs = include('conf.php');

    $db = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                    $configs->DB_USERNAME, 
                    $configs->DB_PASSWORD);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'];

        $stmt = $db->prepare('SELECT id, grid_id FROM users WHERE username = :username');
        $stmt->bindParam(':username', $username);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $gridId = $row['grid_id'];
        $userId = $row['id'];

        if (!$gridId) {
            $response = array(
                'success' => false,
                'message' => 'No grid data found for the selected user.'
            );
            echo json_encode($response);
            exit;
        }

        $stmt = $db->prepare('UPDATE users SET grid_id = NULL WHERE username = :username');
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        $stmt = $db->prepare('DELETE FROM grids WHERE id = :gridId');
        $stmt->bindParam(':gridId', $gridId);
        $stmt->execute();

        $rowCount = $stmt->rowCount();
        if ($rowCount > 0) {
            $response = array(
                'success' => true,
                'message' => 'Grid data deleted successfully.'
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Failed to delete grid data.'
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
