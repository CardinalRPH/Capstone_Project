import React from "react";
const Profile_pg = () => {
    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Edit Profile</h1>
            </div>
            <div>
                <div className="card shadow mb-4 w-100">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Detail Profile</h6>
                    </div>
                    <div className="card-body">
                        <div className="text-center">
                        </div>
                            <label>Current Password</label>
                            <input className="form-control" type="password" placeholder />
                            <label>New Password</label>
                            <input className="form-control" type="password" placeholder />
                        </div>
                    </div>
                    <div className="mt-5 text-center"><button className="btn btn-success profile-button mx-1" type="button">Save</button>
                        <button className="btn btn-primary profile-button mx-1" type="button">Back</button></div>
            </div>
        </>
    )
}

export default Profile_pg;