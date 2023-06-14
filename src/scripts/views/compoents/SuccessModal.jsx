import React from 'react';


class SuccessModal extends React.Component {
    render() {
        return (
            <div id="SuccesModal" className="modal fade">
                <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                        <div className="modal-header justify-content-center modal-Success">
                            <div className="icon-box">
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>
                        <div className="modal-body text-center">
                            <h4>Great!</h4>
                            <p id='SUCCESS-TEXT'>Successfully Text.</p>
                            <button className="btn btn-success" data-dismiss="modal"><span>Start Exploring</span> <i className="material-icons"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SuccessModal;
