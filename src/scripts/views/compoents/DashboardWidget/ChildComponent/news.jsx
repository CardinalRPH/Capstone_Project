import React from "react";

class News extends React.Component {
    render() {
        const { imgUri, text, date, idx, titlex, catG, Author } = this.props || null;

        const subsText = `${text.substring(0, 100)} ...`;
        return (
            <div className="d-flex align-items-center widget-news my-3">
                <img src={imgUri} className="rounded" alt="" />
                <div className="mx-3">
                    <h6>
                        <a href={`/dashboard/article/${idx}`} className="text-dark">{titlex}</a>
                    </h6>
                    <small>{date} / {Author} / {catG}</small>
                    <p>{subsText}</p>
                </div>
            </div>
        )
    }
}
export default News;