import React, {useEffect} from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import CookieConsent from "react-cookie-consent";
import firebaseApp from "../../../globals/FirebaseConfig";
import { AuthVar } from "../../../globals/config";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../stores/authReducer";
import { useNavigate } from "react-router-dom";
import { PassEmailValidate } from "../../utils/EmailPassValidate";

const Signup_pg = () => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, token } = useSelector((state) => state.auth)

    const handleLogin = (token) => {
        dispatch(authAction.login({
            token: token
        }));
    }

    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated && token) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated])

    const ErrorShow = (msg) => {
        document.getElementById('errormsg').innerText=msg
        document.querySelector('.modalCus').classList.remove('hide');
        document.querySelector('.frameCus').style.display = "flex";
    
    }

    const As_Google = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                let { uid, email, emailVerified, displayName } = result.user;
                document.getElementById('Loader').style.display = "flex";
                // This gives you a Google Access Token. You can use it to access the Google API.
                fetch(AuthVar.forLoginG, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: displayName,
                        email: email,
                        uid: uid,
                        verif: emailVerified
                    })
                }).then((response) => {
                    if (!response.ok) {
                        document.getElementById('Loader').style.display = "none";
                        ErrorShow('Internal Server Error');
                        throw new Error('Fail Load With Status ' + response.status);
                    }
                    return response.json();
                }).then((data) => {
                    const { token } = data.data;
                    document.getElementById('Loader').style.display = "none";
                    handleLogin(token);

                }).catch((error) => {
                    document.getElementById('Loader').style.display = "none";
                    ErrorShow('Internal Server Error');
                    console.log(error);
                })

            }).catch((error) => {
                document.getElementById('Loader').style.display = "none";
                ErrorShow('Internal Server Error');
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
                });
                // ...
            });
    }

    const As_UpEmail = (e) => {
        e.preventDefault();
        document.getElementById('Loader').style.display = "flex";
        let firstName = document.getElementById('inputFirstName').value;
        let LastName = document.getElementById('inputLastName').value;
        let email = document.getElementById('inputEmail').value;
        let password = document.getElementById('passwordInput').value;

        if (PassEmailValidate(password, email)) {
            fetch(AuthVar.forSignUp, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullname:firstName,
                    email: email,
                    password: password
                })
            }).then((response) => {
                if (!response.ok) {
                    document.getElementById('Loader').style.display = "none";
                    ErrorShow('Internal Server Error');
                    throw new Error('Fail Load With Status ' + response.status);
                }
                return response.json();
            }).then((data) => {
                const { token } = data.data;
                document.getElementById('Loader').style.display = "none";
                handleLogin(token);
            }).catch((error) => {
                document.getElementById('Loader').style.display = "none";
                ErrorShow('Email Already Exist');
                console.log(error);
            })
        } else {

            console.log("Email or Pass Not Req minimum spec");
        }

    }

    return (
        <>
            <div id="Loader" className="position-fixed top-50 start-50 translate-middle w-100 h-100 justify-content-center align-items-center" style={{ display: "none" }}>
                <div className="spinner-border text-success" role="status" style={{ width: "100px", height: "100px" }}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <h3 class=" headerLogin">Sign Up Account</h3>
            <form class="mx-3" onSubmit={(e) => { As_UpEmail(e) }}>
                <div class="row g-2">
                    <div class="form-group col-sm mb-3 formFullName">
                        <label for="inputFirstName">Nama Depan</label>
                        <input id="inputFirstName" type="text" placeholder="" required autofocus="" class="form-control rounded border-0 shadow-sm px-4 my-2" />
                    </div>
                    <div class="form-group col-sm mb-3 formFullName">
                        <label for="inputLastName">Nama Belakang</label>
                        <input id="inputLastName" type="text" placeholder="" required autofocus="" class="form-control rounded border-0 shadow-sm px-4 my-2" />
                    </div>
                </div>
                <div class="form-group mb-3 formEmail">
                    <label for="inputEmail">Email</label>
                    <input id="inputEmail" type="email" placeholder="" required autofocus="" class="form-control rounded border-0 shadow-sm px-4 my-2" />
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
                    <button onClick={(e) => { As_Google(e) }} class="btn bg-white shadow btn-block text-uppercase my-2 py-2 rounded-pill shadow-sm w-100 google-btn">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="23px" class="mx-1" />
                        Sign up With Google
                    </button>
                    <small class="text-secondary">Already have an account? <a href="/login" class="text-decoration-none text-success">Sign in.</a></small>
                </div>
            </form>
            <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
        </>
    );
}

export default Signup_pg;