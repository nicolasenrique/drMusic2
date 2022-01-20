import React from 'react'
import './ContentWrapper.css'
import TopBar from './TopBar'
import ContentRowTop from './ContentRowTop';
import ContentLeft from './ContentLeft';
import ContentRight from './ContentRight';

const ContentWrapper = () => {
    return (
        <div>
            <TopBar />
            <ContentRowTop />
            <div className="belowPanels">
                <ContentLeft />   
                <ContentRight />
            </div>

        </div>
    )
}

export default ContentWrapper
