import React, { useEffect, useState } from "react";
import province from '../../data/provinces.json'
import regencie from '../../data/regencies.json'
import { useSelector } from "react-redux";
import { AuthVar } from "../../../globals/config";
import { Check_Object, Check_single_Vaalue } from "../../utils/component_check";

const Profile_pg = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [regencies, setRegencies] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [inputState, setInputState] = useState({
    Fname: '',
    Lname: '',
    province: '',
    regence: '',
    email: '',
  });

  const handleChange = (event) => {
    setInputState((prevInputState) => ({
      ...prevInputState,
      [event.target.name]: event.target.value,
    }));
    console.log(inputState);
  };

  // const setProvinC = (provCVal) => {  //this wil get string name not ID
  //   if (!provCVal) {
  //     document.getElementById('provinsi').value = '';
  //   } else {
  //     const provC = province.filter((provCFilter) => provCFilter.name === provCVal)[0];
  //     document.getElementById('provinsi').value = provC.id;
  //     setRegenC(provC.id);
  //   }
  // }

  const setRegenC = () => {
    if (inputState.province != '') {
      setRegencies(regencie.filter((regFilter) => regFilter.province_id === inputState.province));
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
          setInputState(resolve.data)
          if (resolve.data.isGoogle == true) {
            document.getElementById('passField').style.display = 'none';
          } else {
            document.getElementById('passField').style.display = 'block';
          }
        }
      }).catch((error) => {
        console.log(error);
      })
  }

  const UpdateUserInfo = () => {
    if (Check_Object(inputState)) {
      fetch(AuthVar.forUpdateUserInfo, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
        },
        body: JSON.stringify(inputState)
      })
        .then((response) => response.json())
        .then((resolve) => {
          console.log(resolve);
          if (resolve.ok) {
            console.log('Update Success');
            // window.location.reload();
          }
        }).catch((error) => {
          console.log(error);
        })
    } else {
      console.log('Bad Input');
    }
  }

  const UpdateUserPassword = () => {
    if (Check_single_Vaalue(newPassword)) {
      fetch(AuthVar.forUpdateUserPassword, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
        },
        body: JSON.stringify({
          newPassword: newPassword
        })
      })
        .then((response) => response.json())
        .then((resolve) => {
          console.log(resolve);
          if (resolve.ok) {
            console.log('Update Pass Success');
            // window.location.reload();
          }
        }).catch((error) => {
          console.log(error);
        })
    } else {
      console.log('Bad Input');
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      getUserInfo()
    }
  }, []);

  useEffect(() => {
    setRegenC();
  }, [inputState]);


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
            <div className="d-flex">
              <div className="w-50 m-2">
                <label>First Name</label>
                <input className="form-control" name="Fname" value={inputState.Fname} onChange={handleChange} type="text" placeholder='First Name' required />
              </div>
              <div className="w-50 m-2">
                <label>Last Name</label>
                <input className="form-control" name="Lname" value={inputState.Lname} onChange={handleChange} id="Lname" type="text" placeholder='Last Name' required />
              </div>
            </div>
            <div className="m-2">
              <label>Email</label>
              <input className="form-control" name="email" value={inputState.email} onChange={handleChange} id="Email" type="email" placeholder='example@cc.com' required />
            </div>
            <div className="m-2">
              <label>Provinsi</label>
              <select className="form-control" name="province" id="provinsi" value={inputState.province} onChange={(e) => { handleChange(e); }} required>
                <option value="">-- Pilih Provinsi --</option>
                {province.map((provinsi, i) => (
                  <option key={i} value={provinsi.id}>{provinsi.name}</option>
                ))}
              </select>
            </div>
            <div className="m-2">
              <label>Kabupaten</label>
              <select className="form-control" value={inputState.regence} name="regence" onChange={(e) => { handleChange(e); setRegenC() }} id="kabupaten" required>
                <option value="">-- Pilih Kabupaten/Kota --</option>
                {regencies.map((kabupaten, i) => (
                  <option key={i} value={kabupaten.name}>{kabupaten.name}</option>
                ))}
              </select>
            </div>
            <div className="m-2" id="passField">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-group">
                <input type="password" className="form-control" placeholder="New Password" onChange={(e) => { setNewPassword(e.target.value) }} aria-label="New Password" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" onClick={UpdateUserPassword} type="button">Change Password</button>
                </div>
              </div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-success profile-button mx-1 plus float-right" onClick={UpdateUserInfo} type="submit">Update</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile_pg;