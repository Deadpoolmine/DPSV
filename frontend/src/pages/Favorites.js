import React from 'react'
import './Favorites.css'
import HomePage from './HomePage'
import { FAVORITE_DATA } from '../APIManager/API'


class Favorites extends React.Component {
    
    render(){
        return (
            <HomePage dataType={FAVORITE_DATA}/>
        )
    }
}

export default Favorites
