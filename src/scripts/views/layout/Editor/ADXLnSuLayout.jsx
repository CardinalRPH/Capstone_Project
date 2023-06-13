import React from 'react';
import { Outlet } from 'react-router-dom';
import ErrorModal from '../../compoents/ErrorModal';
const ADXLnSuLayout = () => {
    return (<>
        <div id="Loader" className="position-fixed w-100 h-100 justify-content-center align-items-center" style={{ display: "none", zIndex: 1 }}>
            <div className="spinner-border text-success" role="status" style={{ width: "100px", height: "100px" }}>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
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
                                    <h4 className='text-center text-warning'>Editor Page</h4>
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
        <ErrorModal/>
    </>
    );
}

export default ADXLnSuLayout;