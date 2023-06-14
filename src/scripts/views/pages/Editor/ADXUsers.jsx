import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { EditorURI } from "../../../../globals/config";

const ADXUsers_pg = () => {
    const { isAuthenticatedADX } = useSelector((state) => state.authADX);
    const [users, setUsers] = useState([]);

    const getAllUser = () => {
        fetch(EditorURI().getAllUsers(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
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
        const DisableUser = () => {
            if (window.confirm(`Yakin Men-Disable User ${data.Fname}`) == true) {
                fetch(EditorURI(data.uid).DisableUser(), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                    },
                }).then(() => {
                    console.log('Success Disable');
                }).catch((error) => {
                    console.log(error);
                });
            } else {

            }
        }

        const EnableUser = () => {
            if (window.confirm(`Yakin Men-Enable User ${data.Fname}`) == true) {
                fetch(EditorURI(data.uid).EnableUser(), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                    },
                }).then(() => {
                    console.log('Success Enable');
                }).catch((error) => {
                    console.log(error);
                });
            } else {

            }
        }

        const DeleteUser = () => {
            if (window.confirm(`Yakin Men-Delete User ${data.Fname}`) == true) {
                fetch(EditorURI(data.uid).DeleteUser(), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                    },
                }).then(() => {
                    console.log('Success Enable');
                }).catch((error) => {
                    console.log(error);
                });
            } else {

            }
        }

        const MakeItUser = () => {
            if (window.confirm(`Yakin menajadikan ${data.Fname} sebagai User?`) == true) {
                fetch(EditorURI(data.uid).MakeItUser(), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                    },
                }).then(() => {
                    console.log('Success make it User');
                }).catch((error) => {
                    console.log(error);
                });
            } else {

            }
        }

        const MakeItEditor = () => {
            if (window.confirm(`Yakin menajadikan ${data.Fname} sebagai Editor?`) == true) {
                fetch(EditorURI(data.uid).MakeItEditor(), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                    },
                }).then(() => {
                    console.log('Success make it Editor');
                }).catch((error) => {
                    console.log(error);
                });
            } else {

            }
        }

        return (
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger mx-2" onClick={DeleteUser}>Delete</button>
                {data.disabled ? (<button className="btn btn-success mx-2" onClick={EnableUser}>Enable</button>) : (<button className="btn btn-warning mx-2" onClick={DisableUser}>Disable</button>)}
                {data.role == 'user' ? (<button className="btn btn-primary mx-2" onClick={MakeItEditor}>Jadikan Editor</button>) : (<button className="btn btn-secondary mx-2" onClick={MakeItUser}>Jadikan User</button>)}
            </div>

        );
    };



    useEffect(() => {
        if (isAuthenticatedADX) {
            getAllUser();

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
