import React from "react";

const ForgetPwSend_pg = () => {
    return (
        <>
            <div class="d-flex flex-column align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" fill="currentColor" class="bi bi-envelope-paper-heart" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1.133l.941.502A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765L2 3.133V2Zm0 2.267-.47.25A1 1 0 0 0 1 5.4v.817l1 .6v-2.55Zm1 3.15 3.75 2.25L8 8.917l1.25.75L13 7.417V2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5.417Zm11-.6 1-.6V5.4a1 1 0 0 0-.53-.882L14 4.267v2.55ZM8 2.982C9.664 1.309 13.825 4.236 8 8 2.175 4.236 6.336 1.31 8 2.982Zm7 4.401-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734Z" /></svg>
            </div>
            <h3 class="text-center headerLupaPassword">Cek your mail</h3>
            <form class="mx-3">
                <div class="form-group mb-3">
                    <p class="description text-center">We have sent a password recover instructions to your email.</p>
                </div>
                <div class="d-flex flex-column align-items-center">
                    <button type="submit" class="btn bg-success btn-block text-uppercase my-2 py-2 text-white rounded-pill w-100 shadow-sm buttonSignIn">Send Instructions</button>
                    <a href="" class="text-secondary buttonSkip">Skip, I'll confirm later</a>
                </div>
            </form>
        </>
    );
}

export default ForgetPwSend_pg;