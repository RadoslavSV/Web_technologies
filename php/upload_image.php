<?php
    $configs = include('conf.php');

    try {
        $connection = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                                $configs->DB_USERNAME, 
                                $configs->DB_PASSWORD);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if (isset($_FILES['imageFile']) && $_FILES['imageFile']['error'] === UPLOAD_ERR_OK) {
            $imageFile = $_FILES['imageFile'];
            $tempFilePath = $imageFile['tmp_name'];
            $filename = $imageFile['name'];

            $destinationPath = '..\img\\' . $filename;

            if (move_uploaded_file($tempFilePath, $destinationPath)) {
                $gridId = $_POST['grid_id'];

                $query = "UPDATE grids SET image_path = :imagePath WHERE id = :gridId";
                $statement = $connection->prepare($query);
                $statement->bindValue(':imagePath', '../img/' . $filename);
                $statement->bindValue(':gridId', $gridId);
                $statement->execute();

                echo "IMAGE UPLOADED SUCCESSFULLY AND GRID UPDATED";
            } else {
                echo "FAILED TO MOVE THE UPLOADED IMAGE";
            }
        } else {
            echo "NO FILE UPLOADED OR AD ERROR OCCURED DURING UPLOAD";
        }

        $connection = null;
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
?>
