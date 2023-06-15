import React, { useEffect, useState } from "react"
import { PassEmailValidate } from "../../../utils/EmailPassValidate";
import { AuthVar } from "../../../../globals/config";
import { useDispatch, useSelector } from "react-redux";
import { authActionADX } from "../../../stores/ADXauthReducer";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"

const ADXLogin_pg = () => {

    const ErrorShow = (value) => {
        document.getElementById('ERROR-TEXT').innerHTML = value;
        const myModal = new Modal(document.getElementById('ErrorModal2'));
        myModal.show();

    }

    const [inputState, setInputState] = useState({
        email: '',
        password:''
    });


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticatedADX, token } = useSelector((state) => state.authADX)

    const handleLogin = (token) => {
        dispatch(authActionADX.login({
            token: token
        }));
    }

    const handleChange = (event) => {
        setInputState((prevInputState) => ({
            ...prevInputState,
            [event.target.name]: event.target.value,
        }));
    };

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

    useEffect(() => {
        if (isAuthenticatedADX && token) {
            navigate('/e/dashboard', { replace: true });
        }
    }, [isAuthenticatedADX])

    const As_Email = (e) => {
        e.preventDefault();
        document.getElementById('Loader').style.display = "flex";
        let email = document.getElementById('inputEmail').value;
        let password = document.getElementById('passwordInput').value;

        if (PassEmailValidate(password, email)) {
            fetch(AuthVar.forLoginEditor, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // mode:'cors',
                body: JSON.stringify(inputState)
            }).then((response) => {
                if (!response.ok) {
                    document.getElementById('Loader').style.display = "none";
                    ErrorShow('Internal Server Error');
                    throw new Error('Fail Load With Status ' + response.status);
                }
                return response.json();
            }).then((data) => {
                console.log(data);
                const { token } = data.data;
                document.getElementById('Loader').style.display = "none";
                handleLogin(token);
            }).catch((error) => {
                document.getElementById('Loader').style.display = "none";
                ErrorShow('Incorect Email or Password');
                console.log(error);
            })
        } else {
            document.getElementById('Loader').style.display = "none";
            console.log("Email or Pass Not Req minimum spec");
        }

    }
    return (
        <>
            <h3 className=" headerLogin">Sign In Account</h3>
            <form className="mx-3" onSubmit={(e) => { As_Email(e) }}>
                <div className="form-group mb-3 formEmail">
                    <label htmlFor="inputEmail">Email</label>
                    <input id="inputEmail" type="email" placeholder="" name="email" required autoFocus="" onChange={handleChange} className="form-control rounded border-0 shadow-sm px-4 my-2" />
                </div>
                <div className="form-group mb-3 formPassword">
                    <label htmlFor="inputPassword">Password</label>
                    <div className="position-relative">
                        <input id="passwordInput" type="password" name="password" placeholder="" required="" onChange={handleChange} className="form-control rounded border-0 shadow-sm px-4 mt-2" />
                        <i className="fa-regular fa-eye password-toggle position-absolute" onClick={(e) => { showPass(e.target, "passwordInput") }}></i>
                    </div>
                    <small><a href="/forget-password" className="text-secondary text-decoration-none forgetPassword">Forget your password?</a></small>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn bg-success btn-block text-uppercase my-2 py-2 text-white rounded-pill w-100 shadow-sm buttonSignIn">Sign in</button>
                </div>
            </form>
        </>
    )
}

export default ADXLogin_pg;