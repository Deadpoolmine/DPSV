import React from 'react'

import './Card.css'

function BaseCard(props) {
    return (
        <div className='base-card-container'>
            <div className="base-card">
                {props.children}
            </div>
        </div>
    )
}

function PrimaryCard(props) {
    return (
        <div>

        </div>
    )
}

export { BaseCard, PrimaryCard }
