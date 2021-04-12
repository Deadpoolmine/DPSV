import React from 'react'
import { SidebarData } from './SideBarData'
import './SideBar.css'

function SideBar() {
    return (
        <div className="sidebar-container">
            {
                SidebarData.map((data, index) => {
                    return (
                        <div key={index} 
                             className="sidebar-icon-container">
                            <img className="sidebar-icon" 
                                 src={data.icon}></img>
                        </div>      
                    )
                })
            }
        </div>
    )
}

export default SideBar
