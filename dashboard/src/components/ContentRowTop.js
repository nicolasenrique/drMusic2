import React from 'react'
import MainPanel from './MainPanel'
import  './ContentRowTop.css' 

const ContentRowTop = () => {
    return (
        <div className="MainContentRowTop">
            <h2 className="titleContentRowTop">Información Principal</h2>
            <div className="contentRowTop">
                <li><MainPanel /></li>
                <li><MainPanel /></li>
                <li><MainPanel /></li>           
            </div>
        </div>

    )
}

export default ContentRowTop
