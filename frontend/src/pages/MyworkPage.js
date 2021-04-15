import React from 'react'
import { MY_DATA } from '../APIManager/API'
import HomePage from './HomePage'

function MyworkPage() {
    return (
        <HomePage dataType={MY_DATA}/>
    )
}

export default MyworkPage

