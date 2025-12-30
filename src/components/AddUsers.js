import React from "react";
import Sidebar from "./Sidebar";
import UnderConstruction from "./UnderConstruction";

export default function AddUsers() {
    return(
        <div className="grid-container">
            <div className="grid-item">
                <Sidebar current="AddUsers" />
            </div>
            <div className="grid-item">
                <UnderConstruction />
            </div>
        </div>
    )
}