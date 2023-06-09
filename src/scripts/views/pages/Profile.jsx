import React, { useEffect, useState } from "react";

const Profile_pg = () => {
  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);

  useEffect(() => {
    // Mengambil data provinsi dari file JSON
    fetch('../../data/provinces.json')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then(responseJson => {
        setProvinces(responseJson);
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });

    // Mengambil data kabupaten dari file JSON
    fetch('../../data/regencies.json')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then(responseJson => {
        setRegencies(responseJson);
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
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
            <div className="text-center"></div>
            <label>Full Name</label>
            <input className="form-control" type="text" placeholder />
            <label>Email</label>
            <input className="form-control" type="text" placeholder />
            <label>Provinsi</label>
            <select className="form-control" name="provinsi" id="provinsi" required>
              <option value="">-- Pilih Provinsi --</option>
              {provinces.map(provinsi => (
                <option key={provinsi.id} value={provinsi.id}>{provinsi.name}</option>
              ))}
            </select>
            <label>Kabupaten</label>
            <select className="form-control" name="kabupaten" id="kabupaten" required>
              <option value="">-- Pilih Kabupaten --</option>
              {regencies.map(kabupaten => (
                <option key={kabupaten.id} value={kabupaten.id}>{kabupaten.name}</option>
              ))}
            </select>
          </div>
          <div className="mt-5 text-center">
            <button className="btn btn-success profile-button mx-1 plus float-right" type="button">Save</button>
            <button className="btn btn-primary profile-button mx-1 plus float-right" type="button">Back</button>
            <div>
  <div className="modal fade" id="modalSubscriptionForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header text-center">
          <h4 className="modal-title w-100 font-weight-bold">Change Password</h4>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body mx-3">
          <div className="md-form mb-5">
            <i className="fas fa-lock prefix grey-text"/>
            <input type="password" id="form3" className="form-control validate" placeholder="Current Password"/>
          </div>
          <div className="md-form mb-4">
            <i className="fas fa-lock prefix grey-text"/>
            <input type="password" id="form2" className="form-control validate" placeholder="New Password" />
          </div>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button className="btn btn-success profile-button mx-1">Save</button>
        </div>
      </div>
    </div>
  </div>
  <div className="text-center">
    <a href className="btn btn-info profile-button mx-1 plus plus float-right" data-toggle="modal" data-target="#modalSubscriptionForm">Change Password</a>
  </div>
</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile_pg;