import React from 'react';
import { Outlet } from 'react-router-dom';
import Loader from '../compoents/Loader';
import ErrorModal2 from '../compoents/ErrorModal2';
const LnSuLayout = () => {
    return (<>
        <Loader/>
        {/* <ErrorModal/> */}
        <div className="container-fluid">
            <div className="row no-gutter">
                <div className="col-md-6 d-none d-md-flex bg-image-petani"></div>


                <div className="col-md-6 bg-light">
                    <div className="login d-flex align-items-center py-5">

                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-7 mx-auto">
                                    <h1 className="text-center mb-4 text-success jumbotron" style={{ backgroundColor: 'transparent' }}>CropPlanner</h1>
                                    <div className="container p-3 bg-white shadow rounded mt-4">
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        <ErrorModal2/>
    </>
    );
}

export default LnSuLayout;