<?php
    $imagePath = '../img/bigImage.png';

    header('Content-Type: image/png');
    header('Content-Length: ' . filesize($imagePath));

    readfile($imagePath);
?>
