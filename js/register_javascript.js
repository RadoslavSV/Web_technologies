function validateForm() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirm-password").value;
    var email = document.getElementById("email").value;
    var username = document.getElementById("username").value;
    
    var errorElements = document.getElementsByClassName("error");
    for (var i = 0; i < errorElements.length; i++) {
        errorElements[i].textContent = "";
    }

    var bool1 = true, bool2 = true, bool3 = true;

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "INVALID EMAIL";
        bool1 = false;
    } else {
        document.getElementById("emailError").textContent = "";
    }

    var usernamePattern = /^[a-zA-Z0-9_]+$/;
    if (!usernamePattern.test(username)) {
        document.getElementById("usernameError").textContent = "ONLY LETTERS, DIGITS AND _ ARE ALLOWED";
        bool2 = false;
    } else {
        document.getElementById("usernameError").textContent = "";
    }

    if (password !== confirmPassword) {
        document.getElementById("passwordError").textContent = "PASSWORDS DO NOT MATCH";
        bool3 = false;
    } else {
        document.getElementById("passwordError").textContent = "";
    }


    if (bool1 && bool2 && bool3) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.usernameExists) {
                        document.getElementById("usernameError").textContent = "USERNAME ALREADY EXISTS";
                    } else {
                        document.getElementById("usernameError").textContent = "";
                    }
                    if (response.emailExists) {
                        document.getElementById("emailError").textContent = "EMAIL ALREADY EXISTS";
                    } else {
                        document.getElementById("emailError").textContent = "";
                    }

                    if(!response.usernameExists && !response.emailExists) {
                        document.getElementById("successfulRegistration").textContent = "REGISTRATION SUCCESSFUL";
                    }
                } else {
                    console.error('Error:', xhr.status);
                }
            }
        };
        xhr.open("POST", "../php/register.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("username=" + encodeURIComponent(username) + "&email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password));
      
        return false;
    }


    return bool1 && bool2 && bool3;
}