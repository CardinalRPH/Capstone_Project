import React from "react";
<<<<<<< HEAD
const Cards = () => {
    return (
        <div className="card" style={{ width: '18rem' }}>
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                
        <div>
  <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalRelatedContent">Go Somewhere</button>
  {/*Modal: modalRelatedContent*/}
  <div className="modal fade right" id="modalRelatedContent" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="false">
    <div className="modal-dialog modal-side modal-bottom-right modal-notify modal-info" role="document">
      {/*Content*/}
      <div className="modal-content">
        {/*Header*/}
        <div className="modal-header">
          <p className="heading">Related article</p>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true" className="white-text">×</span>
          </button>
        </div>
        {/*Body*/}
        <div className="modal-body">
          <div className="row">
            <div className="col-5">
              <img src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(55).webp" className="img-fluid" alt="" />
            </div>
            <div className="col-7">
              <p><strong>Card Title</strong></p>
              <p>Some quick example text to build on the card title and make up the bulk of the card's content.
              Lorem ipsum dolor sit amet consectetur adipisicing elit [...]
              </p>
              
            </div>
          </div>
        </div>
      </div>
      {/*/.Content*/}
    </div>
  </div>
  </div>
  </div>
</div>

    )
=======

class Card extends React.Component {
    render() {
        const { imgUri, text, date, idx, titlex, catG } = this.props || [];

        const subsText = `${text.substring(0, 100)} ...`;
        return (
            <div className="col-24 col-md-4 mb-4">
                <div className="card" style={{ width: '18rem' }}>
                    <img className="card-img-top" src={imgUri} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{titlex}</h5>
                        <small>{date}</small>
                        <small>{catG}</small>
                        <p className="card-text">{subsText}</p>
                        <a href={idx} className="btn btn-primary">Visit</a>
                    </div>
                </div>
            </div>
        )
    }
>>>>>>> 21059df6d1df2c7c98fb40acc2e13919a99e9cb9
}

export default Card;