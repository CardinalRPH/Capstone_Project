import React, { useEffect, useState } from "react";
import province from '../../data/provinces.json'
import regencie from '../../data/regencies.json'
import { useSelector } from "react-redux";
import { AuthVar } from "../../../globals/config";

const Profile_pg = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [regencies, setRegencies] = useState([]);


  const setProvinC = (provCVal) => {  //this wil get string name not ID
    if (!provCVal) {
      document.getElementById('provinsi').value = '';
    } else {
      const provC = province.filter((provCFilter) => provCFilter.name === provCVal)[0];
      document.getElementById('provinsi').value = provC.id;
      setRegenC(provC.id);
    }
  }

  const setBooth = async (provC, regC) => {
    await setProvinC(provC);
    document.getElementById('kabupaten').value = regC;
  }

  const setRegenC = (regCVal) => {
    if (!regCVal) {
      setRegencies([]);
    } else {
      const regC = regencie.filter((regenCFilter) => regenCFilter.province_id === regCVal);
      document.getElementById('kabupaten').value = '';
      setRegencies(regC);
    }
  }

  const getUserInfo = () => {
    fetch(AuthVar.forGetUserInfo, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
      }
    })
      .then((response) => response.json())
      .then((resolve) => {
        if (resolve.ok && (resolve.data != false)) {
          document.getElementById('Fname').value = resolve.data.Fname
          document.getElementById('Lname').value = resolve.data.Lname
          document.getElementById('Email').value = resolve.data.email
          setBooth(resolve.data.province, resolve.data.regence)
        }
      }).catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    if (isAuthenticated) {
      getUserInfo()
    }
  }, []);

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Edit Profile</h1>
      </div>
      <div>
        <div className="card shadow mb-4 w-100">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Detail Profile</h6>
          </div>
          <div className="card-body">
            <form>
              <div className="d-flex">
                <div className="w-50 m-2">
                  <label>First Name</label>
                  <input className="form-control" id="Fname" type="text" placeholder='First Name' required />
                </div>
                <div className="w-50 m-2">
                  <label>Last Name</label>
                  <input className="form-control" id="Lname" type="text" placeholder='Last Name' required />
                </div>
              </div>
              <div className="m-2">
                <label>Email</label>
                <input className="form-control" id="Email" type="text" placeholder='example@cc.com' required />
              </div>
              <div className="m-2">
                <label>Provinsi</label>
                <select className="form-control" name="provinsi" id="provinsi" onChange={(e) => { setRegenC(e.target.value) }} required>
                  <option value="">-- Pilih Provinsi --</option>
                  {province.map(provinsi => (
                    <option value={provinsi.id}>{provinsi.name}</option>
                  ))}
                </select>
              </div>
              <div className="m-2">
                <label>Kabupaten</label>
                <select className="form-control" name="kabupaten" id="kabupaten" required>
                  <option value="">-- Pilih Kabupaten/Kota --</option>
                  {regencies.map(kabupaten => (
                    <option value={kabupaten.name}>{kabupaten.name}</option>
                  ))}
                </select>
              </div>
              <div className="m-2">
                <label htmlFor="currentPassword">Current Password</label>
                <input type="password" className="form-control validate" id="currentPassword" placeholder="Current Password" required />
              </div>
              <div className="m-2">
                <label htmlFor="newPassword">New Password</label>
                <input type="password" className="form-control validate" id="newPassword" placeholder="New Password" required />
              </div>
              <div className="mt-5 text-center">
                <button className="btn btn-success profile-button mx-1 plus float-right" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile_pg;