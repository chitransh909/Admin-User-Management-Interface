import React from "react";
import "./Sidebar.css"
import DashboardIcon from '@mui/icons-material/Dashboard';
// import AddIcon from '@mui/icons-material/Add';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import SummarizeIcon from '@mui/icons-material/Summarize';
import { Link } from "react-router-dom"

export default function Sidebar(current) {
        return (
            <aside className="sidebar">
                <Link to="/" className="link"><h3 id="sb-heading">Admin Dashboard</h3></Link>
                <Link to="/" className="link">
                    <div className={`${current.current==="Dashboard"? "current": ""}`} id="sb-item" >
                        <DashboardIcon fontSize="small" sx={{marginRight: 0.5}}/>Dashboard                        
                    </div>                    
                </Link>
                {/* <Link to="/AddUsers">
                    <div className={`${current.current==="AddUsers"? "current": ""}`} id="sb-item">
                        <AddIcon fontSize="small" sx={{marginRight: 0.5}}/>Add Users
                    </div>
                </Link>
                <Link to="/Analytics" className="link">
                    <div className={`${current.current==="Analytics"? "current": ""}`} id="sb-item">
                        <BarChartIcon fontSize="small" sx={{marginRight: 0.5}}/>Analytics
                    </div>
                </Link>
                <Link to="/Reports" className="link">
                    <div className={`${current.current==="Reports"? "current": ""}`} id="sb-item">
                        <SummarizeIcon fontSize="small" sx={{marginRight: 0.5}}/>Reports
                    </div>
                </Link> */}
            </aside>
        )
}