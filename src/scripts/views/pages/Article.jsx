import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { TipsURI } from "../../../globals/config";
const Article_pg = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { id } = useParams();
    const [Article, setArticle] = useState({
        Imguri: '',
        article: '',
        date: '',
        tipsId: '',
        title: '',
        categories: '',
        Author: '',
        ImgRef:''
    });

    const getOneTIps = () => {
        fetch(TipsURI(id).getTipsOne(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('authentication')).token
            }
        }).then((response) => response.json())
            .then((resolve) => {
                if (resolve.ok == true) {
                    setArticle(resolve.data);
                } else {
                    setArticle('');
                }
            }).catch((error) => {
                setArticle('');
                console.log(error);
            })
    }

    useEffect(() => {
        if (isAuthenticated) {
            getOneTIps();
        }
    }, []);

    return (
        <div className="container shadow top-level-article my-5">
            <div className="position-relative">
                <img src={Article.Imguri} className="img-fluid article-main-img" alt="" />
                <div className="container w-100 px-5 py-3 position-absolute article-top-Component">
                    <h1>{Article.title}</h1>
                    <h6>{Article.date}  / {Article.Author} / {Article.categories}</h6>
                </div>
            </div>
            <div className="container px-5">
                <small>Img Source : {Article.ImgRef }</small>
                <p className="py-5">{Article.article}</p>
            </div>
        </div>
    )
}

export default Article_pg;