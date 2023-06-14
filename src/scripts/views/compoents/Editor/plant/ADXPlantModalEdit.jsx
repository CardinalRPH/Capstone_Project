import React, { useEffect, useState } from "react";
import weatherCode from "../../../../../globals/WeatherCode";
import { Check_Object } from "../../../../utils/component_check";
import { EditorURI } from "../../../../../globals/config";

const ADXplant_modalEdit = (props) => {
    const { dataPlant } = props || null;
    const [inputState, setInputState] = useState({
        name: '',
        inWeatherFrom: '',
        inWeatherto: '',
        onWatering: '',
        onFertilizer: '',
        onHarvest: '',
    });

    const handleChange = (event) => {
        setInputState((prevInputState) => ({
            ...prevInputState,
            [event.target.name]: event.target.value,
        }));
    };

    useEffect(() => {
        setInputState(dataPlant);
    }, [dataPlant]);

    const modalHide = () => {
        const myModal = document.getElementById('plantModalEdit');
        myModal.classList.remove('show'); // Menghapus kelas 'show'
        myModal.style.display = 'none'; // Mengubah properti 'display' menjadi 'none'
        document.body.classList.remove('modal-open'); // Menghapus kelas 'modal-open' pada elemen <body>
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.parentNode.removeChild(modalBackdrop); // Menghapus elemen modal backdrop jika ada
        }
    }

    const onUpdate = () => {
        if (Check_Object(inputState)) {
            fetch(EditorURI(dataPlant.plantId).UpdatePlant(), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                },
                body: JSON.stringify(inputState)
            }).then(() => {
                modalHide();
                console.log('Success Update');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <div className="modal fade" id="plantModalEdit" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{ maxWidth: "70%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Plant Edit</h1>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="id">ID Tanaman</label>
                            </div>
                            <div className="col">
                                <input type="text" placeholder="Nama Tanaman" name="name" className="w-100" value={dataPlant.plantId} onChange={handleChange} id="id" readOnly />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="name">Nama Tanaman</label>
                            </div>
                            <div className="col">
                                <input type="text" placeholder="Nama Tanaman" name="name" className="w-100" value={inputState.name} onChange={handleChange} id="name" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="inWeatherFrom">Cuaca Dari</label>
                            </div>
                            <div className="col">
                                <select name="inWeatherFrom" className="w-100" value={inputState.inWeatherFrom} onChange={handleChange} id="inWeatherFrom">
                                    <option value="">Pilih Cuaca</option>
                                    {weatherCode.map((code, i) => (<option key={i} value={code.code}>{code.text}</option>))}
                                </select>
                            </div>
                            <div className="col-2">
                                <label htmlFor="inWeatherto">Cuaca Sampai</label>
                            </div>
                            <div className="col">
                                <select name="inWeatherto" className="w-100" value={inputState.inWeatherto} onChange={handleChange} id="inWeatherto">
                                    <option value="">Pilih Cuaca</option>
                                    {weatherCode.map((code, i) => (<option key={i} value={code.code}>{code.text}</option>))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="onWatering">Penyiraman</label>
                            </div>
                            <div className="col">
                                <input type="number" placeholder="Penyiraman" name="onWatering" onChange={handleChange} id="onWatering" value={inputState.onWatering} />
                                <small className="mx-2">Hari</small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="onFertilizer">Pemupukan</label>
                            </div>
                            <div className="col">
                                <input type="number" placeholder="Pemupukan" name="onFertilizer" id="onFertilizer" onChange={handleChange} value={inputState.onFertilizer} />
                                <small className="mx-2">Hari</small>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="onHarvest">Panen</label>
                            </div>
                            <div className="col">
                                <input type="number" placeholder="Panen" name="onHarvest" id="onHarvest" onChange={handleChange} value={inputState.onHarvest} />
                                <small className="mx-2">Hari</small>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer mx-auto">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onUpdate}>Update</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={modalHide}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ADXplant_modalEdit;