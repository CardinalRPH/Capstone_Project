import React from "react";
import { AuthVar } from "../globals/config";
import { EmailValidate } from "../utils/EmailPassValidate";

const ForgetPw_pg = () => {
    const Forget_PW = (e) => {
        e.preventDefault();
        let email = document.getElementById('inputEmail').value;

        if (EmailValidate(email)) {
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
                    throw new Error('Fail Load With Status ' + response.status);
                }
                return response.json();
            }).then((data) => {
                if (data.ok) {
                    window.location.href = '/forget-send';
                } else {
                    console.log("eroor 500");
                }
            }).catch((error) => {
                console.log(error);
            })

        } else {
            console.log('email not valid min spec');
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