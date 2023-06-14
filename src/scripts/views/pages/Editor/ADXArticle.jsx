import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { EditorURI, TipsURI } from "../../../../globals/config";
import { Check_Object } from "../../../utils/component_check";
const ADXArticle = () => {
    const { isAuthenticatedADX } = useSelector((state) => state.authADX);
    const { id } = useParams();
    const navigate = useNavigate();
    const [Article, setArticle] = useState({
        Imguri: '',
        article: '',
        date: '',
        tipsId: '',
        title: '',
        categories: '',
        Author: '',
        ImgRef: ''
    });

    const getOneTIps = () => {
        fetch(TipsURI(id).getTipsOne(), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
            }
        }).then((response) => response.json())
            .then((resolve) => {
                if ((resolve.ok == true) && (resolve.data != null)) {
                    setArticle(resolve.data);
                } else {
                    navigate('/404NOTFOUND');
                }
            }).catch((error) => {
                setArticle('');
                console.log(error);
            })
    }

    const handleChange = (event) => {
        setArticle((prevInputState) => ({
            ...prevInputState,
            [event.target.name]: event.target.value,
        }));
    };

    const onUpdate = () => {
        if (Check_Object(Article)) {
            fetch(EditorURI(id).UpdateTips(), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
                },
                body: JSON.stringify(Article)
            }).then(() => {
                console.log('Success Update');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    const onDelete = () => {
        if (window.confirm(`Yakin Menghapus Article Ini?`) == true) {
          fetch(EditorURI(id).DeleteTips(), {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
            },
          }).then(() => {
              console.log('Success Delete');
              navigate('/e/dashboard/content', { replace: true });
          }).catch((error) => {
            console.log(error);
          });
        } else {
          
        }
      }

    useEffect(() => {
        if (isAuthenticatedADX) {
            getOneTIps();
        }
    }, []);

    return (
        <div className="container shadow top-level-article my-5">
            <div className="position-relative">
                <img src={Article.Imguri} className="img-fluid article-main-img" alt="" />
                <div className="container w-100 px-5 py-3 position-absolute article-top-Component">
                    <input type="url" className="w-100" placeholder="image URL" onChange={handleChange} name="Imguri" value={Article.Imguri} />
                    <input type="text" placeholder="Title" className="Article-title" name="title" onChange={handleChange} value={Article.title} />
                    <div className="d-flex">
                        <input type="date" placeholder="date" name="date" id="" onChange={handleChange} value={Article.date} />
                        <input type="text" placeholder="Author" name="Author" id="" onChange={handleChange} value={Article.Author} />
                        <select name="categories" onChange={handleChange} value={Article.categories} className="w-100" id="categories">
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
            </div>
            <div className="container px-5">
                <div className="d-flex">
                    <small>Img Source : </small>
                    <input type="text" onChange={handleChange} placeholder="Image Ref" name="ImgRef" id="" value={Article.ImgRef} />
                </div>
                <textarea name="article" onChange={handleChange} value={Article.article} className="w-100" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger my-2 mx-2" onClick={onDelete}>Delete</button>
                <button className="btn btn-primary my-2 mx-2" onClick={onUpdate}>Update</button>
            </div>
        </div>
    )
}

export default ADXArticle;