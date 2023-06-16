import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { EditorURI } from "../../../../globals/config";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"

const ADXUsers_pg = () => {
    const { isAuthenticatedADX } = useSelector((state) => state.authADX);
    const [users, setUsers] = useState([]);

    const toggleLoader = (show) => {
        const loaderElement = document.getElementById('Loader');
        if (loaderElement != null) {
            if (show) {
                loaderElement.style.display = 'flex';
            } else {
                loaderElement.style.display = 'none';
            }
        }
    };

    const SuccesShow = (value) => {
        document.getElementById('SUCCESS-TEXT').innerHTML = value;
        const myModal = new Modal(document.getElementById('SuccesModal'));
        myModal.show();
    }
    const ErrorShow = (value) => {
        document.getElementById('ERROR-TEXT').innerHTML = value;
        const myModal = new Modal(document.getElementById('ErrorModal2'));
        myModal.show();
    }

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
            name: 'First name',
            selector: (row) => row.Fname
        },
        {
            name: 'Last name',
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
            if (window.confirm(`Are you sure to Disable User ${data.Fname} ?`) == true) {
                toggleLoader(true);
                fetch(EditorURI(data.uid).DisableUser(), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                    },
                }).then(() => {
                    toggleLoader(false);
                    SuccesShow(`Successfully Disable User ${data.Fname}`);
                    getAllUser();
                }).catch((error) => {
                    toggleLoader(false);
                    ErrorShow(`Failed to Disable User ${data.Fname}`);
                    console.log(error);
                });
            } else {

            }
        }

        const EnableUser = () => {
            if (window.confirm(`Are you sure to Enable User ${data.Fname} ?`) == true) {
                toggleLoader(true);
                fetch(EditorURI(data.uid).EnableUser(), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                    },
                }).then(() => {
                    toggleLoader(false);
                    SuccesShow(`Successfully Enable User ${data.Fname}`);
                    getAllUser();
                }).catch((error) => {
                    toggleLoader(false);
                    ErrorShow(`Failed to Enable User ${data.Fname}`);
                    console.log(error);
                });
            } else {

            }
        }

        const DeleteUser = () => {
            if (window.confirm(`Are you sure to Delete User ${data.Fname} ?`) == true) {
                toggleLoader(true);
                fetch(EditorURI(data.uid).DeleteUser(), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                    },
                }).then(() => {
                    toggleLoader(false);
                    SuccesShow(`Successfully Delete User ${data.Fname}`);
                    getAllUser();
                }).catch((error) => {
                    toggleLoader(false);
                    ErrorShow(`Failed to Delete User ${data.Fname}`);
                    console.log(error);
                });
            } else {

            }
        }

        const MakeItUser = () => {
            if (window.confirm(`Are you sure to make ${data.Fname} as User ?`) == true) {
                toggleLoader(true);
                fetch(EditorURI(data.uid).MakeItUser(), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                    },
                }).then(() => {
                    toggleLoader(false);
                    SuccesShow(`Successfully make ${data.Fname} as User`);
                    getAllUser();
                }).catch((error) => {
                    toggleLoader(false);
                    ErrorShow(`Failed to make ${data.Fname} as User`);
                    console.log(error);
                });
            } else {

            }
        }

        const MakeItEditor = () => {
            if (window.confirm(`Are you sure to make ${data.Fname} as Editor ?`) == true) {
                toggleLoader(true);
                fetch(EditorURI(data.uid).MakeItEditor(), {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                    },
                }).then(() => {
                    toggleLoader(false);
                    SuccesShow(`Successfully make ${data.Fname} as Editor`);
                    getAllUser();
                }).catch((error) => {
                    toggleLoader(false);
                    ErrorShow(`Failed to make ${data.Fname} as Editor`);
                    console.log(error);
                });
            } else {

            }
        }

        return (
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger mx-2" onClick={DeleteUser}>Delete</button>
                {data.disabled ? (<button className="btn btn-success mx-2" onClick={EnableUser}>Enable</button>) : (<button className="btn btn-warning mx-2" onClick={DisableUser}>Disable</button>)}
                {data.role == 'user' ? (<button className="btn btn-primary mx-2" onClick={MakeItEditor}>Make the Editor</button>) : (<button className="btn btn-secondary mx-2" onClick={MakeItUser}>Make the User</button>)}
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
            <div className="d-sm-flex align-items-center justify-content-between mb-2">
                <h1 className="h3 mb-0 text-gray-800">Users</h1>
            </div>
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
