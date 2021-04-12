import React, { useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'
import './NavBar.css'

function NavBar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <div className="nav-bar-header">
            <div className="nav-burger">

            </div>
            <div className="nav-search-bar">
                <Form inline>
                    <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        </div>
        
    )
}

export default NavBar
