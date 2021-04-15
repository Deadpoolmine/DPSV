import React from 'react'
import HomePage from './HomePage'
import * as API from '../APIManager/API';

function Search(props){
    console.log(props.match.params.searchContent)
    return (
        <HomePage dataType={API.SPEC_DATA} searchContent={props.match.params.searchContent}/>
    )    
}

export default Search
