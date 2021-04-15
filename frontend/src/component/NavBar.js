import React, {useState} from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import './NavBar.css'
import * as FaIcons from 'react-icons/fa'
import { PostRequest } from '../APIManager/APISender';
import * as API from '../APIManager/API'; 
import { withRouter } from 'react-router';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent : ""
        }
        console.log(this.props.history);
    }
    render(){

            return (
                <div className="nav-bar-header">
                    <div className="nav-bar-brand">
                        Deadpool Short Video ©
                    </div>
                    <div className="nav-search-bar">
                        <Form inline>
                            <FormControl 
                                type="text" 
                                placeholder="输入关键字吧..." 
                                className=" mr-sm-2"
                                onChange={(e) => {
                                    this.setState({
                                        searchContent : e.target.value
                                    }) 
                                }} />
                            <Button 
                                variant="dark" 
                                style={{display:`flex`, alignItems:`center`, height: `100%`}}
                                onClick={() => {
                                    var user = window.$User;
                                    if(user){
                                        var user_id = user.user_id;
                                        var formData = new FormData();
                                        formData.append("user_id", user_id);
                                        formData.append("search_content", this.state.searchContent);
                                        PostRequest(formData, API.API_ADD_SEARCH, (res)=>{
                                            console.log(res);
                                            console.log(this.props.history);
                                            this.props.history.push("/Search/" + this.state.searchContent);
                                        })
                                    }
                                    else {
                                        console.log(this.props.history);
                                        this.props.history.push("/Search/" + this.state.searchContent);
                                    }
                                }}>
                                <FaIcons.FaSearch/>            
                            </Button>
                        </Form>
                    </div>
                </div>
            )
    }
}

export default withRouter(NavBar)
