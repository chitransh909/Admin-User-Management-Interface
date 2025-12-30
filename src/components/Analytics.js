import React from "react";
import Sidebar from "./Sidebar";
import UnderConstruction from "./UnderConstruction";
import "./Dashboard.css"

export default function Analytics() {
    return(
        <div className="grid-container">
            <div className="grid-item">
                <Sidebar current="Analytics" />
            </div>
            <div className="grid-item">
                <UnderConstruction />
            </div>
        </div>
    )
}