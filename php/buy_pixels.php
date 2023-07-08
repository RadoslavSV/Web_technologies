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

    $requestPayload = file_get_contents('php://input');
    $data = json_decode($requestPayload);

    $userId = $data->userId;
    $topLeftX = $data->topLeftX;
    $topLeftY = $data->topLeftY;
    $width = $data->width;
    $height = $data->height;

    $price = $width * $height * 100;

    $updateBalanceQuery = "UPDATE users SET balance = balance - $price WHERE id = $userId";
    if ($db->query($updateBalanceQuery) === false) {
        $response = [
            'success' => false,
            'message' => 'Failed to update user balance.'
        ];
        echo json_encode($response);
        exit();
    }

    $insertGridQuery = "INSERT INTO grids (user_id, x_coordinate, y_coordinate, width, height) 
                        VALUES ($userId, $topLeftX, $topLeftY, $width, $height)";
    if ($db->query($insertGridQuery) === false) {
        $response = [
            'success' => false,
            'message' => 'Failed to insert new grid.'
        ];
        echo json_encode($response);
        exit();
    }

    $gridId = $db->lastInsertId();

    $checkExistingGridIdQuery = "SELECT grid_id, grid_id_2 FROM users WHERE id = $userId";
    $existingGrids = $db->query($checkExistingGridIdQuery)->fetch(PDO::FETCH_ASSOC);
    if ($existingGrids['grid_id']) {
        $updateUserGridIdQuery = "UPDATE users SET grid_id_2 = $gridId WHERE id = $userId";

        if ($db->query($updateUserGridIdQuery) === false) {
            $response = [
                'success' => false,
                'message' => 'Failed to update user grid ID.'
            ];
            echo json_encode($response);
            exit();
        }
    
        $response = [
            'success' => true,
            'message' => 'Grid bought!',
            'grid_id' => $existingGrids['grid_id'],
            'grid_id_2' => $gridId
        ];
        echo json_encode($response);
    
        $db = null;
    } else {
        $updateUserGridIdQuery = "UPDATE users SET grid_id = $gridId WHERE id = $userId";

        if ($db->query($updateUserGridIdQuery) === false) {
            $response = [
                'success' => false,
                'message' => 'Failed to update user grid ID.'
            ];
            echo json_encode($response);
            exit();
        }
    
        $response = [
            'success' => true,
            'message' => 'Grid bought!',
            'grid_id' => $gridId,
            'grid_id_2' => null
        ];
        echo json_encode($response);
    
        $db = null;
    }
?>
