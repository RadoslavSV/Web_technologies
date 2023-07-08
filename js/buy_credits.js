var username = localStorage.getItem("username");
var balance = parseFloat(localStorage.getItem("balance")).toFixed(2);

document.getElementById("balance").textContent = "Hello, " + username + "! Balance: $" + balance;

document.getElementById("updateButton").addEventListener("click", function() {
    var amount = document.getElementById("amountInput").value;
    if (amount) {
        $.ajax({
            url: "../php/update_balance.php",
            type: "POST",
            data: { username: username, amount: amount },
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    balance = parseFloat(balance) + parseFloat(amount);
                    localStorage.setItem("balance", balance);

                    document.getElementById("operationResult").textContent = "BALANCE UPDATED";

                    balance = parseFloat(localStorage.getItem("balance")).toFixed(2);
                    document.getElementById("balance").textContent = "Hello, " + username + "! Balance: $" + balance;
                } else {
                    document.getElementById("operationResult").textContent = "PLEASE ENTER A POSITIVE NUMBER";
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    } else {
        document.getElementById("operationResult").textContent = "PLEASE ENTER A POSITIVE NUMBER";
    }
});