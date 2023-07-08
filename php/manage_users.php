<?php
    $configs = include('conf.php');

    $db = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                    $configs->DB_USERNAME, 
                    $configs->DB_PASSWORD);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'];
        $balance = $_POST['userBalance'];

        if (!is_numeric($balance) || $balance <= 0) {
            $response = array(
                'success' => false,
                'message' => 'Invalid balance. Please enter a positive number.'
            );
            echo json_encode($response);
            exit;
        }

        $stmt = $db->prepare('UPDATE users SET balance = :balance WHERE username = :username');
        $stmt->bindParam(':balance', $balance);
        $stmt->bindParam(':username', $username);
        $stmt->execute();

        $rowCount = $stmt->rowCount();
        if ($rowCount > 0) {
            $response = array(
                'success' => true,
                'message' => 'Balance updated successfully.'
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Failed to update balance.'
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
