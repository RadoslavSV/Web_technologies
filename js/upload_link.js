var username = localStorage.getItem("username");
var balance = parseFloat(localStorage.getItem("balance")).toFixed(2);

document.getElementById("balance").textContent = "Hello, " + username + "! Balance: $" + balance;

document.getElementById("updateButton").addEventListener("click", function() {
    var link = document.getElementById("linkField").value;
    var user_id = localStorage.getItem("userId");
    var grid_id = localStorage.getItem("grid_id");

    if (link && user_id && grid_id) {
        $.ajax({
            url: "../php/upload_link.php",
            type: "POST",
            data: { user_id: user_id, grid_id: grid_id, link: link },
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    document.getElementById("operationResult").textContent = "LINK ASSIGNED SUCCESSFULLY";
                } else {
                    document.getElementById("operationResult").textContent = "FAILED TO ASSIGN LINK";
                    console.error(response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    } else {
        document.getElementById("operationResult").textContent = "PLEASE ENTER A LINK";
    }
});

document.getElementById("updateTooltipButton").addEventListener("click", function() {
    var tooltip = document.getElementById("tooltipField").value;
    var user_id = localStorage.getItem("userId");
    var grid_id = localStorage.getItem("grid_id");

    if (tooltip && user_id && grid_id) {
        $.ajax({
            url: "../php/upload_tooltip.php",
            type: "POST",
            data: { user_id: user_id, grid_id: grid_id, tooltip: tooltip },
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    document.getElementById("operationResult").textContent = "TOOLTIP ASSIGNED SUCCESSFULLY";
                } else {
                    document.getElementById("operationResult").textContent = "FAILED TO ASSIGN TOOLTIP";
                    console.error(response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    } else {
        document.getElementById("operationResult").textContent = "PLEASE ENTER A TOOLTIP";
    }
});

document.getElementById("updateSecondButton").addEventListener("click", function() {
    var link = document.getElementById("linkField2").value;
    var user_id = localStorage.getItem("userId");
    var grid_id_2 = localStorage.getItem("grid_id_2");

    if (link && user_id && grid_id_2) {
        $.ajax({
            url: "../php/upload_link.php",
            type: "POST",
            data: { user_id: user_id, grid_id: grid_id_2, link: link },
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    document.getElementById("operationResult").textContent = "SECOND LINK ASSIGNED SUCCESSFULLY";
                } else {
                    document.getElementById("operationResult").textContent = "FAILED TO ASSIGN SECOND LINK";
                    console.error(response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    } else {
        document.getElementById("operationResult").textContent = "PLEASE ENTER A SECOND LINK";
    }
});

document.getElementById("updateSecondTooltipButton").addEventListener("click", function() {
    var tooltip = document.getElementById("tooltipField2").value;
    var user_id = localStorage.getItem("userId");
    var grid_id_2 = localStorage.getItem("grid_id_2");

    if (tooltip && user_id && grid_id_2) {
        $.ajax({
            url: "../php/upload_tooltip.php",
            type: "POST",
            data: { user_id: user_id, grid_id: grid_id_2, tooltip: tooltip },
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    document.getElementById("operationResult").textContent = "SECOND TOOLTIP ASSIGNED SUCCESSFULLY";
                } else {
                    document.getElementById("operationResult").textContent = "FAILED TO ASSIGN SECOND TOOLTIP";
                    console.error(response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    } else {
        document.getElementById("operationResult").textContent = "PLEASE ENTER A SECOND TOOLTIP";
    }
});
