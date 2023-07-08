function validateForm() {
    var usernameEmail = document.getElementById("username/email").value;
    var password = document.getElementById("password").value;
    
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.success) {
                    localStorage.setItem("userId", response.userId);
                    localStorage.setItem("username", response.username);
                    localStorage.setItem("balance", response.balance);
                    localStorage.setItem("grid_id", response.grid_id);
                    localStorage.setItem("grid_id_2", response.grid_id_2);

                    if(response.username === 'admin') {
                        window.location.href = "../html/main_admin.html";
                    } else {
                        window.location.href = "../html/main.html";
                    }
                } else {
                    document.getElementById("unsuccessfulLogin").textContent = response.error;
                }
            } else {
                console.error('Error:', xhr.status);
            }
        }
    };
    xhr.open("POST", "../php/login.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("username/email=" + encodeURIComponent(usernameEmail) + "&password=" + encodeURIComponent(password));
  
    return false;
}