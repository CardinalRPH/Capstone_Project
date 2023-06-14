import React from 'react';


class Loader extends React.Component {
    render() {
        return (
            <div id="Loader" className="position-fixed w-100 h-100 justify-content-center align-items-center" style={{ display: "none", zIndex: 1 }}>
                <div className="spinner-border text-success" role="status" style={{ width: "100px", height: "100px" }}>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default Loader;
