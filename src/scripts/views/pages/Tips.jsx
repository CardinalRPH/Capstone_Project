import React, { useEffect, useState } from "react";
import Card from "../compoents/card";
import Articlemodal from "../compoents/ArticleModal";
import { TipsURI } from "../../../globals/config";
import { useSelector } from "react-redux";

const Tips_pg = () => {
    const [Tips, setTips] = useState([]);
    const { isAuthenticated } = useSelector((state) => state.auth)

    const getTipsTrick = () => {
        fetch(TipsURI().getTips(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
            }
        }).then((response) => response.json())
            .then((resolve) => {
                if (resolve.ok && (resolve.data != '')) {
                    console.log(resolve.data);
                    document.getElementById('TipsList').style.display = 'block';
                    document.getElementById('TipsNotFound').style.display = 'none';
                    setTips(resolve.data);
                } else {
                    document.getElementById('TipsList').style.display = 'none';
                    document.getElementById('TipsNotFound').style.display = 'block';
                }
            }).catch((error) => {
                setTips([]);
                document.getElementById('TipsList').style.display = 'none';
                document.getElementById('TipsNotFound').style.display = 'block';
                console.log(error);
            })
    }

    useEffect(() => {
        if (isAuthenticated) {
            getTipsTrick();   //for Design Front End  Jangan Dihapus !
        }
    }, []);
    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-center mb-4">
                <h1 className="h3 mb-0 text-gray-800">Kategori</h1>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="custom-card bg-primary position-relative m-3 rounded">
                        <img src="https://cdn.dribbble.com/users/1026512/screenshots/10130839/waifu_laifu_404_copia.png" className="rounded" alt="" />
                        <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center rounded text-container">
                            <h4>Kategori 1</h4>
                        </div>
                    </div>
                    <div className="custom-card bg-primary position-relative m-3 rounded">
                        <img src="https://cdn.dribbble.com/users/1026512/screenshots/10130839/waifu_laifu_404_copia.png" className="rounded" alt="" />
                        <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center rounded text-container">
                            <h4>Kategori 2</h4>
                        </div>
                    </div>
                    <div className="custom-card bg-primary position-relative m-3 rounded">
                        <img src="https://cdn.dribbble.com/users/1026512/screenshots/10130839/waifu_laifu_404_copia.png" className="rounded" alt="" />
                        <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center rounded text-container">
                            <h4>Kategori 3</h4>
                        </div>
                    </div>
                    <div className="custom-card bg-primary position-relative m-3 rounded">
                        <img src="https://cdn.dribbble.com/users/1026512/screenshots/10130839/waifu_laifu_404_copia.png" className="rounded" alt="" />
                        <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center rounded text-container">
                            <h4>Kategori 4</h4>
                        </div>
                    </div>
                    <div className="custom-card bg-primary position-relative m-3 rounded">
                        <img src="https://cdn.dribbble.com/users/1026512/screenshots/10130839/waifu_laifu_404_copia.png" className="rounded" alt="" />
                        <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center rounded text-container">
                            <h4>Kategori 5</h4>
                        </div>
                    </div>
                    <div className="custom-card bg-primary position-relative m-3 rounded">
                        <img src="https://cdn.dribbble.com/users/1026512/screenshots/10130839/waifu_laifu_404_copia.png" className="rounded" alt="" />
                        <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center rounded text-container">
                            <h4>Kategori 6</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-sm-flex align-items-center justify-content-center mb-4">
                <h1 className="h3 mb-0 text-gray-800">Tips & Trick</h1>
            </div>
            <div className="container" id="TipsList">
                <div className="container">
                    <div className="row justify-content-center">
                        {Tips.map((tips) => (<Card imgUri={tips.Imguri} text={tips.article} idx={tips.tipsId} Author={tips.Author} date={tips.date} titlex={tips.title} catG={tips.categories} />))}
                    </div>
                </div>
            </div>
            <div id="TipsNotFound" className="text-center" style={{ display: 'none' }}>
                <h1>Not Found</h1>
            </div>
            <Articlemodal />
        </>
    )
}

export default Tips_pg;