import React from 'react';


class ErrorModal extends React.Component {
    render() {
        return (<>
            <div className="frameCus">
                <div className="modalCus hide">
                    <img src="https://100dayscss.com/codepen/alert.png" width={44} height={38} />
                    <span className="titleCus">Failed to Login</span>
                    <p id="errormsg">An error</p>
                    <div className="buttonCus" onClick={this.handleClick}>OK</div>
                </div>
            </div>
        </>
        );
    }
    handleClick = () => {
        document.querySelector('.modalCus').classList.add('hide');
        document.querySelector('.frameCus').style.display = "none";
    }
}

export default ErrorModal;
