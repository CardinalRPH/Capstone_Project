import React, { useEffect, useState } from "react";
import DataTables from "../compoents/DataTable";
import { HistoryURI } from "../../../globals/config";
import { useSelector } from "react-redux";

const History_pg = () => {
    const [history, setHistory] = useState([]);
    const { isAuthenticated } = useSelector((state) => state.auth)
    const GetHistory = () => {
        fetch(HistoryURI().getHistory(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
            }
        }).then((response) => response.json())
            .then((resolve) => {
                if (resolve.ok && (resolve.data != false)) {
                    setHistory(resolve.data);
                }
            }).catch((error) => {
                setHistory([])
                console.log(error);
            });
    }

    useEffect(() => {
        if (isAuthenticated) {
            GetHistory();
        }
    }, []);
    const data = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 30 },
        { id: 4, name: 'Jane Smith', age: 31 },
        { id: 5, name: 'Jane Smith', age: 31 },
        { id: 6, name: 'Jane Smith', age: 31 },
        { id: 7, name: 'Jane Smith', age: 31 },
        { id: 8, name: 'Jane Smith', age: 31 },
        { id: 9, name: 'Jane Smith', age: 31 },
        { id: 10, name: 'Jane Smith', age: 31 },
        { id: 11, name: 'Jane Smith', age: 31 },
        { id: 12, name: 'Jane Smith', age: 31 },
    ];

    return (
        <div>
            <h1 className="h3 mb-2 text-gray-800">History</h1>
            <p className="mb-4">DataTables is a third party plugin that is used to generate the demo table below.
                For more information about DataTables, please visit the <a target="_blank" href="https://datatables.net">official DataTables documentation</a>.</p>
            <DataTables dataX={history} />


        </div>

    )
}

export default History_pg;