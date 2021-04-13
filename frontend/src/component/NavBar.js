import React from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import './NavBar.css'
import * as FaIcons from 'react-icons/fa'

function NavBar() {
    return (
        <div className="nav-bar-header">
            <div className="nav-bar-brand">
                Deadpool Short Video ©
            </div>
            <div className="nav-search-bar">
                <Form inline>
                    <FormControl type="text" placeholder="输入关键字吧..." className=" mr-sm-2" />
                    <Button variant="dark" style={{display:`flex`, alignItems:`center`, height: `100%`}}>
                        <FaIcons.FaSearch/>            
                    </Button>
                </Form>
            </div>
        </div>
        
    )
}

export default NavBar
