import React from "react";

const Signup_pg = () => {
    return (
        <>
            <h3 class=" headerLogin">Sign Up Account</h3>
            <form class="mx-3">
                <div class="form-group mb-3 formEmail">
                    <label for="inputEmail">Email</label>
                    <input id="inputEmail" type="email" placeholder="" required="" autofocus="" class="form-control rounded border-0 shadow-sm px-4 my-2" />
                </div>
                <div class="form-group mb-3 formPassword">
                    <label for="inputPassword">Password</label>
                    <input id="passwordInput" type="password" placeholder="" required="" class="form-control rounded border-0 shadow-sm px-4 mt-2" /><span class="password-toggle" onmousedown="showPassword()" onmouseup="hidePassword()" onmouseout="hidePassword()">&#x1f441;</span>
                </div>
                <div class="form-group mb-3 formPassword">
                    <label for="inputReTypePassword">Re-type Password</label>
                    <input id="passwordInput" type="password" placeholder="" required="" class="form-control rounded border-0 shadow-sm px-4 mt-2" />
                </div>
                <div class="d-flex flex-column align-items-center">
                    <button type="submit" class="btn bg-success btn-block text-uppercase my-2 py-2 text-white rounded-pill w-100 shadow-sm buttonSignIn">Sign up</button>
                    <button class="btn bg-white shadow btn-block text-uppercase my-2 py-2 rounded-pill shadow-sm w-100 google-btn">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="23px" class="mx-1" />
                        Sign up With Google
                    </button>
                    <small class="text-secondary">Already have an account? <a href="signin.html" class="text-decoration-none text-success">Sign in.</a></small>
                </div>
            </form>
        </>
    );
}

export default Signup_pg;