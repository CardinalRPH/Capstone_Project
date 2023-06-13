import DataTable from 'react-data-table-component';
import React from 'react';


class DataTables extends React.Component {
    render() {

        const { dataX } = this.props || [];

        const columns = [
            {
                name: 'No',
                selector: (row, i) => i + 1
            },
            {
                name: 'Jenis Tanaman',
                selector: (row) => row.jenisTanaman
            },
            {
                name: 'Tanggal Tanam',
                selector: (row) => row.onPlant
            },
            {
                name: 'Tanggal Panen',
                selector: (row) => row.onHarvest
            },
            {
                name: 'Hasil Panen (Ton)',
                selector: (row) => row.harvestResult
            },
        ];

        return (
            <div>
                <DataTable
                    columns={columns}
                    data={dataX}
                    pagination={true}
                    paginationPerPage={10}
                />
            </div>
        );
    }
}

export default DataTables;