document.addEventListener("DOMContentLoaded", function() {
    var username = localStorage.getItem("username");

    document.getElementById("balance").textContent = "Hello, " + username + "!";

    function populateUsernames() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var users = JSON.parse(xhr.responseText);
                    var selectElement = document.getElementById('usernameSelect');

                    users.forEach(function(user) {
                        var option = document.createElement('option');
                        option.value = user.username;

                        var one = user.grid_id;
                        var two = user.grid_id_2;
                        if(one===null) one = '---';
                        if(two===null) two = '---';

                        option.textContent = user.username + " | " + one + " | " + two + " |";
                        selectElement.appendChild(option);
                    });
                } else {
                    console.error('Error:', xhr.status);
                }
            }
        };
        xhr.open('GET', '../php/get_usernames.php', true);
        xhr.send();
    }

    populateUsernames();

        var updateForm = document.getElementById("manageUsers");
        updateForm.addEventListener("submit", function(event) {
            event.preventDefault();

            var selectedUsername = document.getElementById("usernameSelect").value;
            var balance = document.getElementById("userBalance").value;

            if (balance) {
                $.ajax({
                    url: "../php/manage_users.php",
                    method: updateForm.method,
                    data: {
                        username: selectedUsername,
                        userBalance: balance
                    },
                    dataType: "json",
                    success: function(response) {
                        var dataChange = document.getElementById("dataChange");

                        if (response.success) {
                            dataChange.textContent = "BALANCE UPDATED SUCCESSFULLY";
                        } else {
                            dataChange.textContent = "FAILED TO UPDATE BALANCE";
                        }
                    },
                    error: function() {
                        var dataChange = document.getElementById("dataChange");
                        dataChange.textContent = "An error occurred while updating the balance.";
                    }
                });
            }
        });

        var deleteButton = document.getElementById("deleteButton");
        deleteButton.addEventListener("click", function(event) {
            event.preventDefault();

            var selectedUsername = document.getElementById("usernameSelect").value;

            if (selectedUsername) {
                if (confirm("Are you sure you want to delete the grid data for this user?")) {
                    $.ajax({
                        url: "../php/delete_grid_data.php",
                        method: "POST",
                        data: {
                            username: selectedUsername
                        },
                        dataType: "json",
                        success: function(response) {
                            var dataChange = document.getElementById("dataChange");

                            if (response.success) {
                                dataChange.textContent = "GRID DATA DELETED SUCCESSFULLY";
                            } else {
                                dataChange.textContent = "FAILED TO DELETE GRID DATA";
                            }

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
                            var dataChange = document.getElementById("dataChange");
                            dataChange.textContent = "An error occurred while deleting the grid data.";
                        }
                    });
                }
            }
        });

        var deleteButton2 = document.getElementById("deleteButton2");
        deleteButton2.addEventListener("click", function(event) {
            event.preventDefault();

            var selectedUsername = document.getElementById("usernameSelect").value;

            if (selectedUsername) {
                if (confirm("Are you sure you want to delete the second grid data for this user?")) {
                    $.ajax({
                        url: "../php/delete_grid_2_data.php",
                        method: "POST",
                        data: {
                            username: selectedUsername
                        },
                        dataType: "json",
                        success: function(response) {
                            var dataChange = document.getElementById("dataChange");

                            if (response.success) {
                                dataChange.textContent = "SECOND GRID DATA DELETED SUCCESSFULLY";
                            } else {
                                dataChange.textContent = "FAILED TO DELETE SECOND GRID DATA";
                            }

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
                            var dataChange = document.getElementById("dataChange");
                            dataChange.textContent = "An error occurred while deleting the second grid data.";
                        }
                    });
                }
            }
        });
    });