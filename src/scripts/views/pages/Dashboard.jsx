import React from "react";
const Dashboard_pg = () => {
    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
            <h5>Cuaca Terkini</h5>
            <section className="vh-10" style={{ backgroundColor: "#f5f6f7" }}>
                <div className="container py-1 h-20">
                    <div className="row d-flex h-20">
                        <div className="col-md-10 col-lg-8 col-xl-6">

                            <div className="card bg-transparent text-white" style={{ borderRadius: 40 + 'px' }}>
                                <div className="bg-image" style={{ borderRadius: 40 + 'px' }}>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp" className="card-img" alt="weather" />
                                    <div className="mask" style={{ backgroundColor: "rgba(190, 216, 232, .5)" }}></div>
                                </div>
                                <div className="position-absolute top-0 start-0 text-dark p-5">
                                    <h4 className="mb-0">Juneau, Alaska, US</h4>
                                    <p className="display-2 my-3">1.28°C</p>
                                    <p className="mb-2">Feels Like: <strong>-1.08 °C</strong></p>
                                    <h5>Snowy</h5>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section  className="vh-10">
                <div className="container py-1 h-20">
                    <div className="row d-flex h-20">
                        <div className="col-md-10 col-lg-8 col-xl-6">
                            <div className="card" style={{ color: '#4B515D', borderRadius: '35px' }}>
                                <div className="card-body p-4">
                                    <div className="d-flex">
                                        <h6 className="flex-grow-1">Jakarta</h6>
                                        <h6>15:07 PM</h6>
                                    </div>
                                    <div className="d-flex flex-column text-center mt-5 mb-4">
                                        <h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }}> 13°C </h6>
                                        <span className="small" style={{ color: '#868B94' }}>Stormy</span>
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