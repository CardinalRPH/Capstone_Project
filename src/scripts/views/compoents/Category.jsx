import React from "react";

class Category extends React.Component {
    render() {
        const { img, catName, func } = this.props || null;
        const clicker = () => {
            if (typeof (func) == 'function') {
                func();
            }
        }
        return (
            <div className="custom-card p-0 position-relative m-3 d-flex rounded" onClick={clicker}>
                <img src={img} className="rounded" alt="" />
                <div className="position-absolute custom-card h-100 d-flex justify-content-center align-items-center rounded text-container">
                    <h4>{catName}</h4>
                </div>
            </div>
        )
    }
}
export default Category;