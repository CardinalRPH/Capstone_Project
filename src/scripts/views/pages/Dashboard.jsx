import React from "react";
const Dashboard_pg = () => {
    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>
            <h5>Cuaca Terkini</h5>
            <section className="vh-10" style={{backgroundColor: "#f5f6f7"}}>
                <div className="container py-1 h-20">
                    <div className="row d-flex h-20">
                        <div className="col-md-10 col-lg-8 col-xl-6">

                            <div className="card bg-transparent text-white" style={{borderRadius: 40+'px'}}>
                                <div className="bg-image" style={{borderRadius: 40+'px'}}>
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp" className="card-img" alt="weather" />
                                <div className="mask" style={{backgroundColor: "rgba(190, 216, 232, .5)"}}></div>
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
        </>
    )
}

export default Dashboard_pg;