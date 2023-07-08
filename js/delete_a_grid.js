document.addEventListener("DOMContentLoaded", function() {
    var deleteGridForm = document.getElementById("deleteGridForm");
    deleteGridForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var gridId = document.getElementById("gridId").value;

        if (gridId) {
            $.ajax({
                url: "../php/delete_a_grid.php",
                method: "POST",
                data: {
                    gridId: gridId
                },
                dataType: "json",
                success: function(response) {
                    var dataChange = document.getElementById("dataChange");

                    if (response.success) {
                        dataChange.textContent = "GRID DELETED SUCCESSFULLY";
                        
                        $.ajax({
                            url: "../php/update_image.php",
                            method: "GET",
                            success: function(response) {
                                console.log("Image update successful");
                            },
                            error: function() {
                                console.log("Error updating image");
                            }
                        });
                    } else {
                        dataChange.textContent = "FAILED TO DELETE A GRID";
                    }
                },
                error: function() {
                    var dataChange = document.getElementById("dataChange");
                    dataChange.textContent = "AN ERROR OCCURRED WHILE DELETING THE GRID";
                }
            });
        }
    });
});
