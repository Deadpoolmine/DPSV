import React from 'react'
import { Button } from 'react-bootstrap'
import { PostRequest, GetRequest } from './APIManager/APISender'
import * as API from './APIManager/API';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './component/NavBar';
import HomePage from './pages/HomePage';
import Profile from './component/Profile';
import './App.css'
import SideBar from './component/SideBar';
import Message from './pages/Message';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import UploadPage from './pages/UploadPage';
import Search from './pages/Search';
import * as LS from './utils/LocalStorage';
import {changeTheme} from './utils/Theme';
import MyworkPage from './pages/MyworkPage';

class App extends React.Component {
    constructor(props) {
        super(props);
        changeTheme(false);
    }  
    render(){
        return (
            <main className="main">
                <Router>
                    <div className='app-conatiner'>
                        {/* 1 : 12 : 4 */}
                        <SideBar />
                        <div className="page-container">
                            <NavBar/>
                            <Switch>
                                <Route path="/" exact component={HomePage} />
                                <Route path="/Message" component={Message}/>
                                <Route path="/Favorites" component={Favorites} />
                                <Route path="/Settings" component={Settings}/>
                                <Route path="/UploadPage" component={UploadPage} />
                                <Route path="/Mywork" component={MyworkPage} /> 
                                <Route path="/Search/:searchContent" component={Search}/>
                            </Switch>
                        </div>
                        <Profile />
                    </div>
                </Router>
            </main>
        )
    }
}
 
export default App;
