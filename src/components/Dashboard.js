import React from "react";
import Sidebar from "./Sidebar";
import './Dashboard.css'
import Userdata from "./Userdata";

const Dashboard = () => {

    return (
        <div className="grid-container">
            <div className="grid-item desktop">
                <Sidebar current="Dashboard" />
            </div>
            <div className="grid-item">
                <Userdata />
            </div>
        </div>
    )
}

export default Dashboard