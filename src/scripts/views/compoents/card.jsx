import React from "react";

class Card extends React.Component {
  render() {
    const { imgUri, text, date, idx, titlex, catG, Author } = this.props || null;

    const subsText = `${text.substring(0, 50)} ...`;
    return (
        <div className="card cusCard mx-3" style={{ width: '18rem' }}>
          <img className="card-img-top" height={'180px'} src={imgUri} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{titlex}</h5>
            <h6>{catG}</h6>
            <small>{date} / {Author}</small>
            <p className="card-text">{subsText}</p>
            <a href={`/dashboard/article/${idx}`} className="btn btn-primary">Visit</a>
          </div>
        </div>
    )
  }
}
export default Card;