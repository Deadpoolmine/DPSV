import React from 'react'
import { SidebarData } from './SideBarData'
import './SideBar.css'
import SettingsIcon from './icons/settings.png'
import LogoIcon from './icons/logo.jpg'
import { Link } from 'react-router-dom'
function SideBar() {
    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <img className="sidebar-logo" 
                     src={LogoIcon} />
            </div>
            <div className="sidebar-actions-container">
            {
                SidebarData.map((data, index) => {
                    return (
                        <div key={index} 
                             className="sidebar-icon-container">
                            <Link to={data.path}>
                                <img className="sidebar-icon" 
                                    src={data.icon}>
                                </img>
                            </Link>
                        </div>      
                    )
                })
            }
            </div>
            <div className="sidebar-footer">
                <Link to="/Settings">
                    <img className="sidebar-icon" 
                         src={SettingsIcon} />
                </Link>
            </div>
        </div>
        
    )
}

export default SideBar
