import React from "react";
import Sidebar from "./Sidebar";
import UnderConstruction from "./UnderConstruction";
import "./Dashboard.css"

export default function Reports() {
    return(
        <div className="grid-container">
            <div className="grid-item">
                <Sidebar current="Reports" />
            </div>
            <div className="grid-item">
                <UnderConstruction />
            </div>
        </div>
    )
}