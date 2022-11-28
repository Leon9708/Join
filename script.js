function newPassword() {
    content = document.getElementById('contentContainer');
    content.innerHTML = '';
    document.getElementById('logInHeader').classList.add('d-none')
    content.innerHTML += forgotPasswordContainer();
}

function forgotPasswordContainer() {
    return `
    <div style="width: 700px; height: 340px; padding: 14px" class="divLogIn">
    <img style="cursor: pointer;" onclick="backToLogin()" src="./assets/img/arrow.png">
    <form class="logInForm" action="">
    <h1 style="margin-top: 0" class="logInHeadline">I forgot my password</h1>
    <hr class="underlineHeadline">
    <span> Don´t worry! We will send you an email with the instructions to reset your password. </span>
    <input style="margin-top: 28px" class="logInInputMail" type="text" placeholder="Email">
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
    <div id="contentContainer" class="contentContainer">

        <div class="divLogIn">
            <form class="logInForm" action="">
                <h1 class="logInHeadline">Log In</h1>
                <hr class="underlineHeadline">
                <input class="logInInputMail" type="text" placeholder="Email">
                <input class="logInInputPassword" type="text" placeholder="Password">
                <div class="belowPassword">
                    <input type="checkbox">
                    <span>Remember me</span>
                    <a onclick="newPassword()">Forgot my password</a>
                </div>
                <div class="logInButtons">
                    <button class="logInBtn">Log in</button>
                    <button class="guestLogInBtn">Guest Log in</button>
                </div>
            </form>
        </div>

    </div>
    `
}