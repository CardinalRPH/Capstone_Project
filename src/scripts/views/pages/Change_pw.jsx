import React, { useState } from 'react';

const Change = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Current Password:', currentPassword);
        console.log('New Password:', newPassword);
        setCurrentPassword('');
        setNewPassword('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="modal fade" id="modalSubscriptionForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">Change Password</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3">
                                <div className="md-form mb-5">
                                    <i className="fas fa-lock fa-lg prefix grey-text"></i>
                                    <input type="password" className="form-control validate" placeholder="Current Password" value={currentPassword} onChange={handleCurrentPasswordChange} />
                                </div>
                                <div className="md-form mb-4">
                                    <i className="fas fa-lock fa-lg prefix grey-text"></i>
                                    <input type="password" className="form-control validate" placeholder="New Password" value={newPassword} onChange={handleNewPasswordChange} />
                                </div>
                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button type="submit" className="btn btn-success profile-button mx-1">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Change;
