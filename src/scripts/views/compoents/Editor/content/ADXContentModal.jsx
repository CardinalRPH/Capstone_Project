import React, { useEffect, useState } from "react";
import weatherCode from "../../../../../globals/WeatherCode";
import { Check_Object } from "../../../../utils/component_check";
import { EditorURI } from "../../../../../globals/config";

const ADXcontent_modal = () => {
    const [inputState, setInputState] = useState({
        title: '',
        article: '',
        date: '',
        Imguri: '',
        ImgRef: '',
        categories: '',
        Author: '',
    });

    const handleChange = (event) => {
        setInputState((prevInputState) => ({
            ...prevInputState,
            [event.target.name]: event.target.value,
        }));
    };

    const onSave = () => {
        if (Check_Object(inputState)) {
            fetch(EditorURI().CreateTips(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
                },
                body: JSON.stringify(inputState)
            }).then(() => {
                modalHide();
                console.log('Success Create');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    useEffect(() => {
    }, []);


    const modalHide = () => {
        const myModal = document.getElementById('contentModal');
        myModal.classList.remove('show'); // Menghapus kelas 'show'
        myModal.style.display = 'none'; // Mengubah properti 'display' menjadi 'none'
        document.body.classList.remove('modal-open'); // Menghapus kelas 'modal-open' pada elemen <body>
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.parentNode.removeChild(modalBackdrop); // Menghapus elemen modal backdrop jika ada
        }
    }

    return (
        <div className="modal fade" id="contentModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" style={{ maxWidth: "70%" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Content New</h1>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="title">Judul</label>
                            </div>
                            <div className="col">
                                <input type="text" placeholder="Judul" className="w-100" name="title" onChange={handleChange} id="title" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="categories">Kategori</label>
                            </div>
                            <div className="col">
                                <select name="categories" onChange={handleChange} className="w-100" id="categories">
                                    <option value="">Pilih Kategori</option>
                                    <option value="Semangka">Semangka</option>
                                    <option value="Padi">Padi</option>
                                    <option value="Jagung">Jagung</option>
                                    <option value="Tebu">Tebu</option>
                                    <option value="Singkong">Singkong</option>
                                    <option value="Lainnya">Lainnya...</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="date">Tanggal</label>
                            </div>
                            <div className="col">
                                <input type="date" onChange={handleChange} className="w-100" name="date" id="date" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="Imguri">Image URL</label>
                            </div>
                            <div className="col">
                                <input type="url" onChange={handleChange} placeholder="Image URL" className="w-100" name="Imguri" id="Imguri" />
                            </div>
                            <div className="col-2">
                                <label htmlFor="ImgRef">Image Refrensi</label>
                            </div>
                            <div className="col">
                                <input type="text" onChange={handleChange} placeholder="Image Refrensi" className="w-100" name="ImgRef" id="ImgRef" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="Author">Penulis</label>
                            </div>
                            <div className="col">
                                <input type="text" onChange={handleChange} placeholder="Penulis" className="w-100" name="Author" id="Author" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="article">Artikel</label>
                            </div>
                            <div className="col">
                                <textarea name="article" onChange={handleChange} className="w-100" id="article" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer mx-auto">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onSave}>Save</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={modalHide}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ADXcontent_modal;