import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TipsURI } from "../../../../globals/config";
import ADXCard from "../../compoents/Editor/ADXcard";
import ADXcontent_modal from "../../compoents/Editor/content/ADXContentModal";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js"

const ADXContent = () => {
  const { isAuthenticatedADX } = useSelector((state) => state.authADX);
  const [Tips, setTips] = useState([]);


  const getTipsTrick = () => {
    fetch(TipsURI().getTips(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': JSON.parse(localStorage.getItem('ADXauthentication')).token
      }
    }).then((response) => response.json())
      .then((resolve) => {
        if (resolve.ok && (resolve.data != '')) {
          document.getElementById('TipsNotFound').style.display = 'none';
          setTips(resolve.data);
        } else {
          document.getElementById('TipsNotFound').style.display = 'block';
        }
      }).catch((error) => {
        setTips([]);
        document.getElementById('TipsList').style.display = 'none';
        document.getElementById('TipsNotFound').style.display = 'block';
        console.log(error);
      })
  }

  const modalShow = () => {
    const myModal = new Modal(document.getElementById('contentModal'));
    myModal.show();
  }

  useEffect(() => {
    if (isAuthenticatedADX) {
      getTipsTrick();

    }
  }, []);

  return (
    <>
      <div className="container" id="TipsList">
        <div className="container">
          <div className="row justify-content-center">
            <div id="TipsNotFound" className="text-center" style={{ display: 'none' }}>
              <h1>Not Found</h1>
            </div>
            <div className="card cursor-pointer mx-3" onClick={modalShow} style={{ width: '18rem' }}>
              <div className="card-body align-items-center justify-content-center d-flex flex-column">
                <i className="fa-solid fa-plus fa-3x text-primary"></i>
                <h5>Add Content</h5>
              </div>
            </div>
            {Tips.map((tips) => (<ADXCard imgUri={tips.Imguri} text={tips.article} idx={tips.tipsId} Author={tips.Author} date={tips.date} titlex={tips.title} catG={tips.categories} />))}
            <div className="col-24 mx-2 mb-4">
            </div>
          </div>
        </div>
      </div>
      <ADXcontent_modal />
    </>
  );
};

export default ADXContent;
