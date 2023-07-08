<?php
    $configs = include('conf.php');

    try {
        $connection = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                                $configs->DB_USERNAME, 
                                $configs->DB_PASSWORD);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if (isset($_FILES['secondImageFile']) && $_FILES['secondImageFile']['error'] === UPLOAD_ERR_OK) {
            $secondImageFile = $_FILES['secondImageFile'];
            $tempFilePath = $secondImageFile['tmp_name'];
            $filename = $secondImageFile['name'];

            $destinationPath = '..\img\\' . $filename;

            if (move_uploaded_file($tempFilePath, $destinationPath)) {
                $gridId2 = $_POST['grid_id'];

                $query = "UPDATE grids SET image_path = :secondImageFile WHERE id = :gridId";
                $statement = $connection->prepare($query);
                $statement->bindValue(':secondImageFile', '../img/' . $filename);
                $statement->bindValue(':gridId', $gridId2);
                $statement->execute();

                echo "SECOND IMAGE UPLOADED SUCCESSFULLY AND GRID UPDATED";
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
