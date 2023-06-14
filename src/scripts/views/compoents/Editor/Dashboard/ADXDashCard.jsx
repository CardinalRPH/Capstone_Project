import React from "react";
class ADXDashCard extends React.Component {
    render() {
        const { value, color, icon, name } = this.props || null;

        return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className={`card border-left-${color} shadow h-100 py-2`}>
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}>{name }</div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">{value}</div>
                            </div>
                            <div className="col-auto">
                                <i className={ `fas ${icon} fa-2x text-gray-300`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ADXDashCard;