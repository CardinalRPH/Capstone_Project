import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ADXDashCard from "../../compoents/Editor/Dashboard/ADXDashCard";
import { EditorURI } from "../../../../globals/config";

const ADXDashboard_pg = () => {
  const { isAuthenticatedADX } = useSelector((state) => state.authADX);
  const [users, setUsers] = useState('0');
  const [plant, setPlant] = useState('0');
  const [Tips, setTips] = useState('0');

  const CountUser = () => {
    fetch(EditorURI().CountUser(), {
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
  const CountPlant = () => {
    fetch(EditorURI().CountPlant(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
      }
    }).then((response) => response.json())
      .then((resolve) => {
        if (resolve.ok && (resolve.data != false)) {
          setPlant(resolve.data);
        }
      }).catch((error) => {
        console.log(error);
      })
  }
  const CountTips = () => {
    fetch(EditorURI().CountTips(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
      }
    }).then((response) => response.json())
      .then((resolve) => {
        if (resolve.ok && (resolve.data != false)) {
          setTips(resolve.data);
        }
      }).catch((error) => {
        console.log(error);
      })
  }


  useEffect(() => {
    if (isAuthenticatedADX) {
      CountUser();
      CountTips();
      CountPlant();
    }
  }, []);

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>
      <div className="row">
        <div className="col">
          <ADXDashCard icon='fa-users' name='Users' value={users} color='primary' />
          <ADXDashCard icon='fa-newspaper' name='Tips and Trick' value={Tips} color='warning' />
        </div>
        <div className="col">
          <ADXDashCard icon='fa-seedling' name='Plant' value={plant} color='success' />
        </div>
      </div>
    </>
  );
};

export default ADXDashboard_pg;
