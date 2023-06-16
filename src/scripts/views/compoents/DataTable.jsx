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
                name: 'Plant Type',
                selector: (row) => row.jenisTanaman
            },
            {
                name: 'Planting Date',
                selector: (row) => row.onPlant
            },
            {
                name: 'Harvest Date',
                selector: (row) => row.onHarvest
            },
            {
                name: 'Hasil Result (Ton)',
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