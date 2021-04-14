import React from 'react'
import './Favorites.css'
import {HomePage,DEFAULT_DATA, FAVORITE_DATA, SPEC_DATA} from './HomePage'


class Favorites extends React.Component {
    
    render(){
        return (
            <HomePage dataType={FAVORITE_DATA}/>
        )
    }
}

export default Favorites
