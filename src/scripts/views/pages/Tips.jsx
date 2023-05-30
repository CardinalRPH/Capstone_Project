import React from "react";
import Cards from "../compoents/card";
const Tips_pg = () => {
    return (
        <>

            <div class="row no-gutter ">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Kategori</h1>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col-3">
                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-outline-success w-100">
                                <img src="gambar1.png" alt="Gambar 1" class="mr-2"/>
                                <h6 className="h6 mb-0 text-black">Tips Menanam Padi</h6>
                                </button>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-outline-success w-100">
                                <img src="gambar2.png" alt="Gambar 2" class="mr-2"/>
                                <h6 className="h6 mb-0 text-black">Tips Menanam Jagung</h6>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="row">
                            <div class="col-12">
                                <button class="btn btn-outline-success w-100">
                                <img src="gambar3.png" alt="Gambar 3" class="mr-2"/>
                                <h6 className="h6 mb-0 text-black">Tips Menanam Cabai</h6>
                                </button>
                            </div>
                            <div class="col-12">
                              <button class="btn btn-outline-success w-100">
                                <img src="gambar4.png" alt="Gambar 4" class="mr-2"/>
                                <h6 className="h6 mb-0 text-black">Tips Menanam Tomat</h6>
                              </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                    <div class="row">
                        <div class="col-12">
                        <button class="btn btn-outline-success w-100">
                            <img src="gambar5.png" alt="Gambar 5" class="mr-2"/>
                                <h6 className="h6 mb-0 text-black">Tips Menanam Lobak</h6>
                        </button>
                        </div>
                        <div class="col-12">
                        <button class="btn btn-outline-success w-100">
                            <img src="gambar6.png" alt="Gambar 6" class="mr-2"/>
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
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                        <div class="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                        <div class="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                        <div class="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                        <div class="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                        <div class="col-12 col-md-4 mb-4">
                            <Cards/>
                        </div>
                    </div>
                </div>       
            </div>
        </>
    )
}

export default Tips_pg;