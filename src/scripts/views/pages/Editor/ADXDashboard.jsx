import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ADXDashCard from "../../compoents/Editor/Dashboard/ADXDashCard";

const ADXDashboard_pg = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)


  useEffect(() => {
    if (isAuthenticated) {

    }
  }, []);

  return (
    <div className="row">
      <div className="col">
        <ADXDashCard icon='fa-calendar' name='test' value='val' color='primary' />
        <ADXDashCard icon='fa-calendar' name='test' value='val' color='primary' />
      </div>
      <div className="col">
        <ADXDashCard icon='fa-calendar' name='test' value='val' color='primary' />
        <ADXDashCard icon='fa-calendar' name='test' value='val' color='primary' />
      </div>
    </div>

  );
};

export default ADXDashboard_pg;
