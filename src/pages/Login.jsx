import React from "react"
const Login_pg = () => {
    return (
        <>
            <h3 className=" headerLogin">Sign In Account</h3>
            <form className="mx-3">
                <div className="form-group mb-3 formEmail">
                    <label htmlFor="inputEmail">Email</label>
                    <input id="inputEmail" type="email" placeholder="" required="" autoFocus="" className="form-control rounded border-0 shadow-sm px-4 my-2" />
                </div>
                <div className="form-group mb-3 formPassword">
                    <label htmlFor="inputPassword">Password</label>
                    <input id="passwordInput" type="password" placeholder="" required="" className="form-control rounded border-0 shadow-sm px-4 mt-2" /><span className="password-toggle" onMouseDown="showPassword()" onMouseUp="hidePassword()" onMouseOut="hidePassword()">&#x1f441;</span>
                    <small><a href="lupaPassword.html" className="text-secondary text-decoration-none forgetPassword">Forget your password?</a></small>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn bg-success btn-block text-uppercase my-2 py-2 text-white rounded-pill w-100 shadow-sm buttonSignIn">Sign in</button>
                    <button className="btn bg-white shadow btn-block text-uppercase my-2 py-2 rounded-pill shadow-sm w-100 google-btn">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="23px" className="mx-1" />
                        Sign in With Google
                    </button>
                    <small className="text-secondary">Dont have account <a href="signup.html" className="text-decoration-none text-success">Sign Up</a></small>
                </div>
            </form>
        </>
    )
}

export default Login_pg