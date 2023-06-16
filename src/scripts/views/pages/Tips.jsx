import React, { useEffect, useState } from "react";
import Card from "../compoents/card";
import Articlemodal from "../compoents/ArticleModal";
import { TipsURI } from "../../../globals/config";
import { useSelector } from "react-redux";
import Category from "../compoents/Category";

import Vegetrable from '../../../public/images/Category/Sayur.jpg';
import FoodCrop from '../../../public/images/Category/Pangan.jpg';
import Fruits from '../../../public/images/Category/Buah.jpg';
import Herbs from '../../../public/images/Category/Rempah.jpg';

const Tips_pg = () => {
    const [Tips, setTips] = useState([]);
    const [TipsTemp, setTipsTemp] = useState([]);
    const { isAuthenticated } = useSelector((state) => state.auth);

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
                    document.getElementById('TipsList').style.display = 'block';
                    document.getElementById('TipsNotFound').style.display = 'none';
                    setTips(resolve.data);
                    setTipsTemp(resolve.data);
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

    const FilterFruits = (value) => {
        let filter = Tips.filter((myFilter) => myFilter.categories === value);
        setTipsTemp(filter)
    }

    const ResetFilter = () => {
        setTipsTemp(Tips);
    }

    useEffect(() => {
        if (isAuthenticated) {
            getTipsTrick();   //for Design Front End  Jangan Dihapus !
        }
    }, []);
    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-center mb-4">
                <h1 className="h3 mb-0 text-gray-800">Category</h1>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <Category img={Fruits} func={() => FilterFruits('Fruits')} catName='Fruits' />
                    <Category img={FoodCrop} func={() => FilterFruits('Food Crop')} catName='Food Crop' />
                    <Category img={Vegetrable} func={() => FilterFruits('Vegetables')} catName='Vegetables' />
                    <Category img={Herbs} func={() => FilterFruits('Herbs')} catName='Herbs' />
                </div>
            </div>

            <div className="d-sm-flex align-items-center justify-content-center mb-4">
                <h1 className="h3 mb-0 text-gray-800 cursorer" onClick={ResetFilter}>Tips & Trick</h1>
            </div>
            <div className="container" id="TipsList">
                <div className="row justify-content-center">
                    {TipsTemp.map((tips) => (<Card imgUri={tips.Imguri} key={tips.tipsId} text={tips.article} idx={tips.tipsId} Author={tips.Author} date={tips.date} titlex={tips.title} catG={tips.categories} />))}
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