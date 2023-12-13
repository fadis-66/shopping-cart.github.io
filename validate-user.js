function isUserLoggedIn() {
    return !!sessionStorage.getItem("loggedInUserEmail");
}

if (!isUserLoggedIn()) {
    window.location.href = "login.html";
}

function initSession() {
    const loggedInUserEmail = sessionStorage.getItem("loggedInUserEmail");
    const users = JSON.parse(sessionStorage.getItem("users"));
    const loggedInUser = users.find(user => user[0] === loggedInUserEmail)[1];
    document.getElementById('welcome-username').innerText = `Welcome ${loggedInUser.fullname}`;
}

function logout() {
    sessionStorage.removeItem('loggedInUserEmail');
    window.location.href = "login.html";
}