<?php
    $configs = include('conf.php');

    try {
        $connection = new PDO("mysql:host=$configs->DB_HOST;dbname=$configs->DB_NAME;charset=$configs->DB_CHARSET", 
                                $configs->DB_USERNAME, 
                                $configs->DB_PASSWORD);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT x_coordinate, y_coordinate, width, height, image_path FROM grids WHERE image_path IS NOT NULL";
        $statement = $connection->prepare($query);
        $statement->execute();

        $bigImage = imagecreatetruecolor(1000, 1000);
        imagesavealpha($bigImage, true);
        $transparentColor = imagecolorallocatealpha($bigImage, 0, 0, 0, 127);
        imagefill($bigImage, 0, 0, $transparentColor);

        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $y = $row['x_coordinate'];
            $x = $row['y_coordinate'];
            $width = $row['width'];
            $height = $row['height'];
            $imagePath = $row['image_path'];

            $actualY = $y * 10;
            $actualX = $x * 10;
            $actualWidth = $width * 10;
            $actualHeight = $height * 10;

            $image = imagecreatefrompng($imagePath);
            $imageResized = imagescale($image, $actualWidth, $actualHeight);

            imagecopy($bigImage, $imageResized, $actualX, $actualY, 0, 0, $actualWidth, $actualHeight);

            imagedestroy($image);
            imagedestroy($imageResized);
        }

        imagepng($bigImage, '..\img\bigImage.png');

        imagedestroy($bigImage);

        $connection = null;
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
?>
