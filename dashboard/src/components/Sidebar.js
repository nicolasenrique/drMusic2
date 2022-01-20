import React from 'react'
import './SideBar.css'
import LogoTitle from './LogoTitle'
import SideMenu from './SideMenu'

const Sidebar = () => {
    return (
        <div className="sideBar">
            <br></br>
            <LogoTitle />
            <br></br>
            <SideMenu />
        </div>
    )
}

export default Sidebar
