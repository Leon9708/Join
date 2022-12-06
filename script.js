function newPassword() {
    content = document.getElementById('contentContainer');
    content.innerHTML = '';
    document.getElementById('logInHeader').classList.add('d-none')
    content.innerHTML += forgotPasswordContainer();
}

function forgotPasswordContainer() {
    return `
    <div class="divForgotPassword">
    <img style="cursor: pointer;" onclick="backToLogin()" src="./assets/img/arrow.png">
    <form class="logInForm" action="">
    <h1 style="margin-top: 0" class="logInHeadline">I forgot my password</h1>
    <hr class="underlineHeadline">
    <span> Don´t worry! We will send you an email with the instructions to reset your password. </span>
    <input required style="margin-top: 28px" class="logInInputMail" type="email" placeholder="Email">
    <button style="width: 140px" class="logInBtn">Send me the mail</button>
    </form>
    </div>
    `
}

function backToLogin() {
    content = document.getElementById('contentContainer');
    content.innerHTML = '';
    document.getElementById('logInHeader').classList.remove('d-none')
    content.innerHTML += loginContainer();
}

function loginContainer() {
    return `
        <div class="divLogIn">
            <form id="logInForm" class="logInForm" onsubmit="return false">
                <h1 class="logInHeadline">Log In</h1>
                <hr class="underlineHeadline">
                <input required id="logInInputMail" class="logInInputMail" type="email" placeholder="Email">
                <input required id="logInInputPassword" class="logInInputPassword" type="text" placeholder="Password">
                <div class="belowPassword">
                    <input type="checkbox">
                    <span>Remember me</span>
                    <a onclick="newPassword()">Forgot my password</a>
                </div>
                <div class="logInButtons">
                    <button onclick="onsubmitLogIn()" class="logInBtn">Log in</button>
                    <button onclick="onsubmitGuestLogIn()" class="guestLogInBtn">Guest Log in</button>
                </div>
            </form>
        </div>
    `
}

function signUp() {
    content = document.getElementById('contentContainer');
    content.innerHTML = '';
    document.getElementById('logInHeader').classList.add('d-none')
    content.innerHTML += signUpContainer();
}

function signUpContainer() {
    return `
        <div style="height: 420px; padding: 14px" class="divLogIn">
        <img style="cursor: pointer;" onclick="backToLogin()" src="./assets/img/arrow.png">
            <form class="logInForm" onsubmit="submitSignUp(); return false">
                <h1 style="margin-top: 0" class="logInHeadline">Sign Up</h1>
                <hr class="underlineHeadline">
                <input required id="signUpInputName" class="logInInputName" type="text" placeholder="Name">
                <input required id="signUpInputMail" class="logInInputMail" type="email" placeholder="Email">
                <input required id="signUpInputPassword" class="logInInputPassword" type="text" placeholder="Password">
                <div style="margin-top: 10px" class="logInButtons">
                    <button class="logInBtn">Sign Up</button>
                </div>
            </form>
        </div>
    `
}

function login() {
    document.getElementById('contentContainer').innerHTML += `
        <div class="userAlert"> User not found - <br> instead use Guest Log in </div>
    `
}
function onsubmitLogIn() {
    document.getElementById('logInForm').setAttribute("onsubmit", "login(); return false")
}

function submitSignUp() {
    window.location.href="./summary.html ";
}

function guestLogIn() {
    window.location.href="./summary.html";
}

function onsubmitGuestLogIn(){
    document.getElementById(`logInInputMail`).required = false;
    document.getElementById(`logInInputPassword`).required = false;
    document.getElementById('logInForm').setAttribute("onsubmit", "guestLogIn(); return false")
}

