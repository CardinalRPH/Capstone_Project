import React, { useState } from "react";
import { Check_Object } from "../../../../utils/component_check";
import { EditorURI } from "../../../../../globals/config";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js";

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

    const toggleBadReq = (show) => {
        const loaderElement = document.getElementById('BadReq');
        if (show) {
            loaderElement.style.display = 'block';
        } else {
            loaderElement.style.display = 'none';
        }
    };

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

    const handleChange = (event) => {
        setInputState((prevInputState) => ({
            ...prevInputState,
            [event.target.name]: event.target.value,
        }));
    };

    const onSave = () => {
        if (Check_Object(inputState)) {
            toggleBadReq(false);
            toggleLoader(true);
            fetch(EditorURI().CreateTips(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                },
                body: JSON.stringify(inputState)
            }).then(() => {
                modalHide();
                SuccesShow('Succesfully Add Content');
                toggleLoader(false);
            }).catch((error) => {
                modalHide();
                toggleLoader(false);
                ErrorShow('Failed to Add Content');
                console.log(error);
            });
        } else {
            toggleBadReq(true);
        }
    }

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
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="col">
                                <input type="text" placeholder="Title" className="w-100" name="title" onChange={handleChange} id="title" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="categories">Category</label>
                            </div>
                            <div className="col">
                                <select name="categories" onChange={handleChange} className="w-100" id="categories">
                                    <option value="">Choose Category</option>
                                    <option value="Food Crop">Food Crop</option>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Vegetrable">Vegetables</option>
                                    <option value="Herbs">Herbs</option>
                                    <option value="Other">Other..</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="date">Date</label>
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
                                <label htmlFor="ImgRef">Image Reference</label>
                            </div>
                            <div className="col">
                                <input type="text" onChange={handleChange} placeholder="Image Reference" className="w-100" name="ImgRef" id="ImgRef" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="Author">Writer</label>
                            </div>
                            <div className="col">
                                <input type="text" onChange={handleChange} placeholder="Writer" className="w-100" name="Author" id="Author" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <label htmlFor="article">Article</label>
                            </div>
                            <div className="col">
                                <textarea name="article" placeholder="Article" onChange={handleChange} className="w-100" id="article" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                    <p id="BadReq" className="text-danger text-center" style={{ display: 'none' }}>All fields must be filled</p>
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