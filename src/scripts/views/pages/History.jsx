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

    return (
        <div>
            <h1 className="h3 mb-2 text-gray-800">History</h1>
            <DataTables dataX={history} />


        </div>

    )
}

export default History_pg;