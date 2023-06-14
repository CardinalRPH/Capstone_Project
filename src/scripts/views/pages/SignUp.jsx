import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import CookieConsent from "react-cookie-consent";
import firebaseApp from "../../../globals/FirebaseConfig";
import { AuthVar } from "../../../globals/config";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../stores/authReducer";
import { useNavigate } from "react-router-dom";
import province from '../../data/provinces.json'
import regencie from '../../data/regencies.json'
import { Check_Object } from "../../utils/component_check";

const Signup_pg = () => {

    const provider = new GoogleAuthProvider();
    const auth = getAuth(firebaseApp);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, token } = useSelector((state) => state.auth)
    const [inputForm, setInputForm] = useState({
        email: '',
        fname: '',
        lname: '',
        password: '',
        province: '',
        regence: ''
    });

    const [regencies, setRegencies] = useState([]);

    const setRegenC = (e) => {
        handleChange(e);
        let regCVal = e.target.value;

        if (!regCVal) {
            setRegencies([]);
        } else {
            const regC = regencie.filter((regenCFilter) => regenCFilter.province_id === regCVal);
            document.getElementById('regence').value = '';
            setRegencies(regC);
        }
    }

    const handleChange = (event) => {
        setInputForm((prevInputState) => ({
            ...prevInputState,
            [event.target.name]: event.target.value,
        }));
        console.log(inputForm);
    };

    const handleLogin = (token) => {
        dispatch(authAction.login({
            token: token
        }));
    }

    useEffect(() => {
        if (isAuthenticated && token) {
            navigate('/dashboard', { replace: true });
        }
    }, [isAuthenticated])

    const ErrorShow = (msg) => {
        document.getElementById('errormsg').innerText = msg
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

        if (Check_Object(inputForm)) {
            fetch(AuthVar.forSignUp, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputForm)
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

    const checkMatch = () => {
        const pw1 = document.getElementById('passwordInput');
        const pw2 = document.getElementById('inputReTypePassword');
        const subBtn = document.getElementById('submBtn');
        if (pw1.value == pw2.value) {
            subBtn.disabled = false;
            pw1.style.border = '';
            pw2.style.border = '';
        } else {
            subBtn.disabled = true;
            pw1.style.cssText = 'border: red 1px solid !important';
            pw2.style.cssText = 'border: red 1px solid !important';
        }
    }

    const showPass = (e, id) => {
        const password = document.getElementById(id);
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        if (type === 'password') {
            e.classList.remove('fa-eye-slash');
            e.classList.add('fa-eye');
        } else {
            e.classList.add('fa-eye-slash');
            e.classList.remove('fa-eye');
        }
    }

    return (
        <>
            <div id="Loader" className="position-fixed top-50 start-50 translate-middle w-100 h-100 justify-content-center align-items-center" style={{ display: "none" }}>
                <div className="spinner-border text-success" role="status" style={{ width: "100px", height: "100px" }}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <h3 className=" headerLogin">Sign Up Account</h3>
            <form className="mx-3" onSubmit={(e) => { As_UpEmail(e) }}>
                <div className="row g-2">
                    <div className="form-group col-sm mb-3 formFullName">
                        <label for="inputFirstName">Nama Depan</label>
                        <input id="inputFirstName" name="fname" type="text" placeholder="" required autofocus="" className="form-control rounded border-0 shadow-sm px-4 my-2" onChange={handleChange} />
                    </div>
                    <div className="form-group col-sm mb-3 formFullName">
                        <label for="inputLastName">Nama Belakang</label>
                        <input id="inputLastName" name="lname" type="text" placeholder="" required autofocus="" className="form-control rounded border-0 shadow-sm px-4 my-2" onChange={handleChange} />
                    </div>
                </div>
                <div className="row g-2">
                    <div className="form-group col-sm mb-3 formFullName">
                        <label for="province">Provinsi</label>
                        <select className="form-control rounded border-0 shadow-sm px-4 my-2" name="province" id="province" onChange={setRegenC} required>
                            <option value="">Pilih Provinsi</option>
                            {province.map((provinsi, i) => (
                                <option key={i} value={provinsi.id}>{provinsi.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-sm mb-3 formFullName">
                        <label for="regence">Kabupaten/Kota</label>
                        <select className="form-control rounded border-0 shadow-sm px-4 my-2" name="regence" id="regence" onChange={handleChange} required>
                            <option value="">Pilih Kabupaten/Kota</option>
                            {regencies.map((kabupaten, i) => (
                                <option key={i} value={kabupaten.name}>{kabupaten.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-group mb-3 formEmail">
                    <label for="inputEmail">Email</label>
                    <input id="inputEmail" type="email" name="email" placeholder="" required autofocus="" onChange={handleChange} className="form-control rounded border-0 shadow-sm px-4 my-2" />
                </div>
                <div className="form-group mb-3 formPassword">
                    <label for="inputPassword">Password</label>
                    <div className="position-relative">
                        <input id="passwordInput" type="password" name="password" placeholder="" required="" onChange={handleChange} className="form-control rounded border-0 shadow-sm px-4 mt-2" />
                        <i class="fa-regular fa-eye password-toggle position-absolute" onClick={(e) => { showPass(e.target, "passwordInput") }}></i>
                    </div>
                </div>
                <div className="form-group mb-3 formPassword">
                    <label for="inputReTypePassword">Re-type Password</label>
                    <div className="position-relative">
                        <input id="inputReTypePassword" type="password" placeholder="" required="" onKeyUp={checkMatch} className="form-control rounded border-0 shadow-sm px-4 mt-2" />
                        <i class="fa-regular fa-eye password-toggle position-absolute" onClick={(e) => { showPass(e.target, "inputReTypePassword") }}></i>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn bg-success btn-block text-uppercase my-2 py-2 text-white rounded-pill w-100 shadow-sm buttonSignIn" id="submBtn" >Sign up</button>
                    <button onClick={(e) => { As_Google(e) }} className="btn bg-white shadow btn-block text-uppercase my-2 py-2 rounded-pill shadow-sm w-100 google-btn">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="23px" className="mx-1" />
                        Sign up With Google
                    </button>
                    <small className="text-secondary">Already have an account? <a href="/i/login" className="text-decoration-none text-success">Sign in.</a></small>
                </div>
            </form>
            <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
        </>
    );
}

export default Signup_pg;