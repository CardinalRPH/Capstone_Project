import React from "react";
const Dashboard_pg = () => {
    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
            <h5>Cuaca Terkini</h5>
            
            <section  className="vh-10">
                <div className="container py-1 h-20">
                    <div className="row d-flex h-20">
                        <div className="col-md-10 col-lg-8 col-xl-6">
                        <div className="card" style={{ color: '#4B515D', borderRadius: '35px', backgroundImage: 'url("https://res.cloudinary.com/dxfq3iotg/image/upload/v1557323760/weather.svg")', backgroundSize: 'cover' }}>
                                <div className="card-body p-4">
                                    <div className="d-flex align-items-center">
                                    <i className="fas fa-location-dot mr-2"/> 
                                    <h6 className="flex-grow-1 mb-0">West Jakarta</h6>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp" width="80px"></img>
                                    </div>
                                    <div className="d-flex flex-column text-center mt-5 mb-4">
                                        <h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }}> 15:07 PM </h6>
                                        <span className="small" style={{ color: '#868B94' }}>Wednesday, 17 June 2023</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                                            <div><i className="fas fa-wind fa-fw" style={{ color: '#868B94' }} /> <span className="ms-1"> 40 km/h
                                            </span></div>
                                            <div><i className="fas fa-tint fa-fw" style={{ color: '#868B94' }} /> <span className="ms-1"> 84% </span>
                                            </div>
                                            <div><i className="fas fa-sun fa-fw" style={{ color: '#868B94' }} /> <span className="ms-1"> 0.2h </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Dashboard_pg;