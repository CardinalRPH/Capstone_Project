import React from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import CookieConsent from "react-cookie-consent";

import firebaseApp from "../globals/FirebaseConfig";
import { PassEmailValidate } from "../utils/EmailPassValidate";
import { AuthVar } from "../globals/config";


const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);

const Login_pg = () => {

    const As_Google = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log(credential);
                fetch(AuthVar.forLoginG, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Jtoken: credential.idToken,
                    })
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error('Fail Load With Status ' + response.status);
                    }
                    return response.json();
                }).then((data) => {
                    console.log(data);
                }).catch((error) => {
                    console.log(error);
                })

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log({
                    errorCode: errorCode,
                    errorMessage: errorMessage,
                    email: email,
                    credential: credential
                })
                // ...
            });
    }

    const As_Email = (e) => {
        e.preventDefault();

        let email = document.getElementById('inputEmail').value;
        let password = document.getElementById('passwordInput').value;

        console.log({
            email: email,
            password: password
        });

        if (PassEmailValidate(password, email)) {
            fetch(AuthVar.forLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Fail Load With Status ' + response.status);
                }
                return response.json();
            }).then((data) => {
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
        } else {

            console.log("Email or Pass Not Req minimum spec");
        }

    }
    return (
        <>
            <h3 className=" headerLogin">Sign In Account</h3>
            <form className="mx-3" onSubmit={(e) => { As_Email(e) }}>
                <div className="form-group mb-3 formEmail">
                    <label htmlFor="inputEmail">Email</label>
                    <input id="inputEmail" type="email" placeholder="" required autoFocus="" className="form-control rounded border-0 shadow-sm px-4 my-2" />
                </div>
                <div className="form-group mb-3 formPassword">
                    <label htmlFor="inputPassword">Password</label>
                    <input id="passwordInput" type="password" placeholder="" required className="form-control rounded border-0 shadow-sm px-4 mt-2" /><span className="password-toggle" onMouseDown="" onMouseUp="hidePassword()" onMouseOut="hidePassword()">&#x1f441;</span>
                    <small><a href="/forget-password" className="text-secondary text-decoration-none forgetPassword">Forget your password?</a></small>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn bg-success btn-block text-uppercase my-2 py-2 text-white rounded-pill w-100 shadow-sm buttonSignIn">Sign in</button>
                    <button onClick={(e) => { As_Google(e) }} className="btn bg-white shadow btn-block text-uppercase my-2 py-2 rounded-pill shadow-sm w-100 google-btn">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="23px" className="mx-1" />
                        Sign in With Google
                    </button>
                    <small className="text-secondary">Dont have account <a href="sign-up" className="text-decoration-none text-success">Sign Up</a></small>
                </div>
            </form>
            <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
        </>
    )
}

export default Login_pg