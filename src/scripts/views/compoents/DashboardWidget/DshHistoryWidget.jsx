import React from "react";
class Dshhistorywidget extends React.Component {
    render() {
        const { history } = this.props || null;

        return (
            <div className="bg-white shadow rounded m-3 col">
                <div className="card-body">
                    <h4 className="card-title">History</h4>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Jenis Tanaman</th>
                                <th>Tanggal Panen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.reverse().slice(0, 4).map((data, i) => (
                                <tr key={data.historyId}>
                                    <td>{i + 1}</td>
                                    <td>{data.jenisTanaman}</td>
                                    <td>{data.onHarvest}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}
export default Dshhistorywidget;