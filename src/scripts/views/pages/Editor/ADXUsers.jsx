import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { EditorURI } from "../../../../globals/config";
import province from '../../../data/provinces.json'
import regencie from '../../../data/regencies.json'

const ADXUsers_pg = () => {
    const { isAuthenticatedADX } = useSelector((state) => state.authADX);
    const [users, setUsers] = useState([]);

    const getAllUser = () => {
        fetch(EditorURI().getAllUsers(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
            }
        }).then((response) => response.json())
            .then((resolve) => {
                if (resolve.ok && (resolve.data != false)) {
                    setUsers(resolve.data);
                }
            }).catch((error) => {
                console.log(error);
            })
    }

    const columns = [
        {
            name: 'ID',
            selector: (row) => row.uid
        },
        {
            name: 'Fname',
            selector: (row) => row.Fname
        },
        {
            name: 'Lname',
            selector: (row) => row.Lname
        },
        {
            name: 'Email',
            selector: (row) => row.email
        },
        {
            name: 'Province',
            selector: (row) => row.province
        },
        {
            name: 'Regence',
            selector: (row) => row.regence
        },
    ]

    const ExpandedComponent = ({ data }) => {

        return (
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger mx-2">Delete</button>
                <button className="btn btn-warning mx-2">Disable</button>
            </div>

        );
    };



    useEffect(() => {
        getAllUser();
        if (isAuthenticatedADX) {

        }
    }, []);

    return (
        <>
            <DataTable
                columns={columns}
                data={users}
                pagination={true}
                paginationPerPage={10}
                expandableRows
                expandOnRowClicked
                expandableRowsComponent={ExpandedComponent}
            />
        </>
    );
};

export default ADXUsers_pg;
