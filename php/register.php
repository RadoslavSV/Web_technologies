<?php
    $configs = include('conf.php');

    $db = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                    $configs->DB_USERNAME, 
                    $configs->DB_PASSWORD);

    $username = $_POST['username'];
    $email = $_POST['email'];
    $pass= $_POST['password'];

    $usernameExists = false;
    $stmt = $db->prepare("SELECT * FROM users WHERE username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        $usernameExists = true;
    }

    $emailExists = false;
    $stmt = $db->prepare("SELECT * FROM users WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        $emailExists = true;
    }

    if (!$usernameExists && !$emailExists) {
        $sql = "INSERT INTO `users` (`username`, `password`, `email`) VALUES ('$username', '$pass', '$email')";
        $result = $db->exec($sql);

        if ($result !== false) {
            $response = array(
                'success' => true
            );
        } else {
            $response = array(
                'success' => false,
                'error' => 'Failed to insert data into the database.'
            );
        }
    } else {
        $response = array(
            'success' => false,
            'error' => 'Username or email already exists.'
        );
    }
    
    $response = array(
        'usernameExists' => $usernameExists,
        'emailExists' => $emailExists
    );

    header('Content-Type: application/json');
    echo json_encode($response);
?>