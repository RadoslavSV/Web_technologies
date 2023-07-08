<?php
    $configs = include('conf.php');

    $db = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                    $configs->DB_USERNAME, 
                    $configs->DB_PASSWORD);

    $user_id = $_POST['user_id'];
    $grid_id = $_POST['grid_id'];
    $link = $_POST['link'];

    $query = "UPDATE grids SET hyperlink = :link WHERE user_id = :user_id AND id = :grid_id";

    $stmt = $db->prepare($query);
    $stmt->bindParam(':link', $link);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':grid_id', $grid_id);

    $response = array();

    if ($stmt->execute()) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
        $response['error'] = "Failed to assign link";
    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>
