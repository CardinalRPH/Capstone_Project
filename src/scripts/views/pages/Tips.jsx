import React from "react";
import Cards from "../compoents/card";
const Tips_pg = () => {
    return (
        <>

            <div className="row no-gutter ">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Kategori</h1>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-3">
                        <div className="row">
                            <div className="col-12">
                                <button className="btn btn-outline-success w-100">
                                <img src="gambar1.png" alt="Gambar 1" className="mr-2"/>
                                <h6 className="h6 mb-0 text-black">Tips Menanam Padi</h6>
                                </button>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-outline-success w-100">
                                <img src="gambar2.png" alt="Gambar 2" className="mr-2"/>
                                <h6 className="h6 mb-0 text-black">Tips Menanam Jagung</h6>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="row">
                            <div className="col-12">
                                <button className="btn btn-outline-success w-100">
                                <img src="gambar3.png" alt="Gambar 3" className="mr-2"/>
                                <h6 className="h6 mb-0 text-black">Tips Menanam Cabai</h6>
                                </button>
                            </div>
                            <div className="col-12">
                              <button className="btn btn-outline-success w-100">
                                <img src="gambar4.png" alt="Gambar 4" className="mr-2"/>
                                <h6 className="h6 mb-0 text-black">Tips Menanam Tomat</h6>
                              </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                    <div className="row">
                        <div className="col-12">
                        <button className="btn btn-outline-success w-100">
                            <img src="gambar5.png" alt="Gambar 5" className="mr-2"/>
                                <h6 className="h6 mb-0 text-black">Tips Menanam Lobak</h6>
                        </button>
                        </div>
                        <div className="col-12">
                        <button className="btn btn-outline-success w-100">
                            <img src="gambar6.png" alt="Gambar 6" className="mr-2"/>
                                <h6 className="h6 mb-0 text-black">Tips Menanam Ubi</h6>
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Berita Terkini</h1>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                        <div className="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                        <div className="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                        <div className="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                        <div className="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                        <div className="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                    </div>
                </div>       
            </div>
        </>
    )
}

export default Tips_pg;