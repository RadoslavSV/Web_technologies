<?php
    $configs = include('conf.php');

    $db = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                    $configs->DB_USERNAME, 
                    $configs->DB_PASSWORD);

    $usernameEmail = $_POST['username/email'];
    $password = $_POST['password'];

    $stmt = $db->prepare("SELECT * FROM users WHERE (username = :username OR email = :email) AND password = :password");
    $stmt->bindParam(':username', $usernameEmail);
    $stmt->bindParam(':email', $usernameEmail);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $userId = $row['id'];
        $username = $row['username'];
        $balance = $row['balance'];
        $grid_id = $row['grid_id'];
        $grid_id_2 = $row['grid_id_2'];

        $response = array(
            'success' => true,
            'userId' => $userId,
            'username' => $username,
            'balance' => $balance,
            'grid_id' => $grid_id,
            'grid_id_2' => $grid_id_2
        );
    } else {
        $response = array(
            'success' => false,
            'error' => 'LOGIN UNSUCCESSFUL'
        );
    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>