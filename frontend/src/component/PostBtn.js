import React from 'react'
import './PostBtn.css'

function PostBtn(props) {
    return (
        <div className="postbtn-container">
            {props.children}
        </div>
    )
}

export default PostBtn
