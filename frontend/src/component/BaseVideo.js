import React from 'react'
import { Player } from 'video-react'
import './BaseVideo.css'

function BaseVideo(props) {
    return (
        <div className="video-container">
            <Player
                src={props.videoSrcPreview} />
            <div className="video-border" />
        </div>
    )
}

export default BaseVideo
