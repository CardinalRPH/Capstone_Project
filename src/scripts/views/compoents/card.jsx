import React from "react";

class Card extends React.Component {
  render() {
    const { imgUri, text, date, idx, titlex, catG } = this.props || [];

    //const subsText = `${text.substring(0, 100)} ...`;
    return (
      <div className="col-24 col-md-4 mb-4">
        <div className="card" style={{ width: '18rem' }}>
          <img className="card-img-top" src={imgUri} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{titlex}</h5>
            <small>{date}</small>
            <small>{catG}</small>
<<<<<<< HEAD
            <p className="card-text">{}</p>
            <a href="#modalRelatedContent" className="btn btn-primary">Visit</a>
=======
            <p className="card-text">{subsText}</p>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modalRelatedContent">Visit</button>
>>>>>>> 46644eb708c836e3d6dc8559266fc9227cffa371
          </div>
        </div>
      </div>
    )
  }
}
export default Card;