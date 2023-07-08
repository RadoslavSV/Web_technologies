var username = localStorage.getItem("username");
var balance = parseFloat(localStorage.getItem("balance")).toFixed(2);

document.getElementById("balance").textContent = "Hello, " + username + "! Balance: $" + balance;

function uploadImage() {
    var formData = new FormData();
    var imageFile = document.getElementById("imageFile").files[0];
    var gridId = localStorage.getItem("grid_id");

    if (!imageFile) {
        alert("Please select an image file.");
        return;
    }

    formData.append("imageFile", imageFile);
    formData.append("grid_id", gridId);

    $.ajax({
        url: "../php/upload_image.php",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            document.getElementById("operationResult").textContent = response;
            $.ajax({
                url: "../php/update_image.php",
                type: "GET",
                success: function(response) {
                    console.log("Image update successful");
                },
                error: function() {
                    console.log("Error updating image");
                }
            });
        },
        error: function() {
            alert("An error occurred during image upload.");
        }
    });
}

function uploadSecondImage() {
    var formData = new FormData();
    var secondImageFile = document.getElementById("secondImageFile").files[0];
    var gridId2 = localStorage.getItem("grid_id_2");

    if (!secondImageFile) {
        alert("Please select a second image file.");
        return;
    }

    formData.append("secondImageFile", secondImageFile);
    formData.append("grid_id", gridId2);

    $.ajax({
        url: "../php/upload_second_image.php",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            document.getElementById("operationResult").textContent = response;
            $.ajax({
                url: "../php/update_image.php",
                type: "GET",
                success: function(response) {
                    console.log("Second image update successful");
                },
                error: function() {
                    console.log("Error updating second image");
                }
            });
        },
        error: function() {
                alert("An error occurred during second image upload.");
        }
    });
 }