import React from 'react';


class ErrorModal1 extends React.Component {
    render() {
        const { FuClick } = this.props;

        const handleClick = () => {
            if (typeof FuClick === 'function') {
                FuClick();
            }
        }

        return (<>
            <div id="ErrorModal1" className="modal fade">
                <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center modal-Error">
                            <div className="icon-box">
                                <i className="fa-solid fa-x"></i>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body text-center">
                            <h4>Ooops!</h4>
                            <p>Your Token Has Expired</p>
                            <button className="btn btn-success" onClick={handleClick} data-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }
}

export default ErrorModal1;
