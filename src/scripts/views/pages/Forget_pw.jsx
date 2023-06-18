import React from "react";
import { AuthVar } from "../../../globals/config"
import { EmailValidate } from "../../utils/EmailPassValidate";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"

const ForgetPw_pg = () => {

    const ErrorShow = (value) => {
        document.getElementById('ERROR-TEXT').innerHTML = value;
        const myModal = new Modal(document.getElementById('ErrorModal2'));
        myModal.show();
    }

    const toggleLoader = (show) => {
        const loaderElement = document.getElementById('Loader');
        if (loaderElement != null) {
            if (show) {
                loaderElement.style.display = 'flex';
            } else {
                loaderElement.style.display = 'none';
            }
        }
    };

    const Forget_PW = (e) => {
        e.preventDefault();
        let email = document.getElementById('inputEmail').value;

        if (EmailValidate(email)) {
            toggleLoader(true);
            fetch(AuthVar.forForgetPw, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            }).then((response) => {
                if (!response.ok) {
                    toggleLoader(false);
                    throw new Error('Fail Load With Status ' + response.status);
                }
                return response.json();
            }).then((data) => {
                toggleLoader(false);
                if (data.ok) {
                    window.location.href = '/forget-password/sended';
                } else if ((data.ok == false) && (data.code == 403)) {
                    ErrorShow('Google Account cant reset password with this link');
                }
            }).catch((error) => {
                toggleLoader(false);
                if (error.message.substring(error.message.lastIndexOf(' ') + 1) == 403) {
                    ErrorShow('Google Account cant reset password with this link');
                } else {
                    console.log(error);
                }
            })

        } else {
            ErrorShow('Email not valid');
        }
    }
    return (
        <>
            <h3 className=" headerLupaPassword">Forgot Your Password?</h3>
            <form className="mx-3" onSubmit={Forget_PW}>
                <div className="form-group mb-3">
                    <p className="description">Enter the email associated with your account
                        and we'll send an email with instructions
                        to reset your password.</p>
                </div>
                <div className="form-group mb-3 formEmail">
                    <label htmlFor="inputEmail">Email</label>
                    <input id="inputEmail" type="email" placeholder="" required autoFocus="" className="form-control rounded border-0 shadow-sm px-4 my-2" />
                </div>
                <div className="d-flex flex-column align-items-center">
                    <button type="submit" className="btn bg-success btn-block text-uppercase my-2 py-2 text-white rounded-pill w-100 shadow-sm buttonSignIn">Send Instructions</button>
                </div>
            </form>
        </>
    );
}

export default ForgetPw_pg;