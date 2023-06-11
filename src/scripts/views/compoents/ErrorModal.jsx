import React from 'react';


class ErrorModal extends React.Component {
    render() {
        const { FuClick } = this.props;

        const handleClick = () => {
            if (typeof FuClick === 'function') {
                FuClick();
            }
            document.querySelector('.modalCus').classList.add('hide');
            document.querySelector('.frameCus').style.display = "none";
        }

        return (<>
            <div className="frameCus">
                <div className="modalCus hide">
                    <img src="https://100dayscss.com/codepen/alert.png" width={44} height={38} />
                    <span className="titleCus">Failed to Login</span>
                    <p id="errormsg">An error</p>
                    <div className="buttonCus" onClick={handleClick}>OK</div>
                </div>
            </div>
        </>
        );
    }
}

export default ErrorModal;
