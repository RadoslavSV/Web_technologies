<?php
    $configs = include('conf.php');

    $db = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                    $configs->DB_USERNAME, 
                    $configs->DB_PASSWORD);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $username = $_POST['username'];
        $amount = $_POST['amount'];

        if (!is_numeric($amount) || $amount <= 0) {
            $response = array(
                'success' => false,
                'message' => 'Invalid amount. Please enter a positive number.'
            );
            echo json_encode($response);
            exit;
        }

        $stmt = $db->prepare('UPDATE users SET balance = balance + :amount WHERE username = :username');
        $stmt->bindParam(':amount', $amount);
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
