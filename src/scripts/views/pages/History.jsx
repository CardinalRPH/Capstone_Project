import React from "react";
const History_pg = () => {
    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">History</h1>
            </div>
            <div className="container-fluid">
                <div className="card shadow mb-4 w-100">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">History 2023</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>Jenis Tanaman</th>
                                        <th>Tanggal Mulai</th>
                                        <th>Tanggal Panen</th>
                                        <th>Hasil Panen (Ton)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Padi</td>
                                        <td>07/02/2023</td>
                                        <td>07/05/2023</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>Jagung</td>
                                        <td>07/03/2023</td>
                                        <td>07/06/2023</td>
                                        <td>15</td>
                                    </tr>
                                    <tr>
                                        <td>Cabai</td>
                                        <td>07/02/2023</td>
                                        <td>07/05/2023</td>
                                        <td>12</td>
                                    </tr>
                                    <tr>
                                        <td>Tomat</td>
                                        <td>07/02/2023</td>
                                        <td>07/05/2023</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>Lobak</td>
                                        <td>07/02/2023</td>
                                        <td>07/05/2023</td>
                                        <td>10</td>
                                    </tr>
                                    <tr>
                                        <td>Ubi</td>
                                        <td>07/02/2023</td>
                                        <td>07/05/2023</td>
                                        <td>10</td>
                                    </tr>
                                </tbody>
                            </table>
                            <nav aria-label="Page navigation">
                                <ul className="pagination plus float-right">
                                    <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default History_pg;