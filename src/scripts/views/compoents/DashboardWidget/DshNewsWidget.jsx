import React from "react";
import News from "./ChildComponent/news";

class Dshnewswidget extends React.Component {
    render() {
        const { Tips } = this.props || null;
        
        return (
            <div className="w-100 bg-white shadow rounded">
                <div className="card-body">
                    <h4 className="card-title text-dark"> News & Updates</h4>
                    {Tips.reverse().slice(0, 4).map((tips) => (<News key={tips.tipsId} imgUri={tips.Imguri} text={tips.article} idx={tips.tipsId} Author={tips.Author} date={tips.date} titlex={tips.title} catG={tips.categories} />))}
                </div>
            </div>
        )
    }
}
export default Dshnewswidget;