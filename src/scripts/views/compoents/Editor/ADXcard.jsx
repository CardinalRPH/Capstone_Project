import React from "react";
import { Link } from "react-router-dom";
class ADXCard extends React.Component {
  render() {
    const { imgUri, text, date, idx, titlex, catG, Author } = this.props || null;

    const subsText = `${text.substring(0, 50)} ...`;
    return (
        <div className="card cusCard m-3" style={{ width: '18rem' }}>
          <img className="card-img-top" src={imgUri} height={'180px'} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{titlex}</h5>
            <h6>{catG}</h6>
            <small>{date} / {Author}</small>
            <p className="card-text">{subsText}</p>
            <Link to={`/e/dashboard/article/${idx}`} className="btn btn-primary">Visit/Edit/Delete</Link>
          </div>
        </div>
    )
  }
}
export default ADXCard;