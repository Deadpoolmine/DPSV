import React from 'react'
import { Image, OverlayTrigger, Tooltip, Form, FormControl, Button } from 'react-bootstrap';
import * as LS from '../utils/LocalStorage';
import './Profile.css'
import DefaultAvatar from './icons/logo.jpg'
import UploadOverlay from './icons/upload-avatar.png'
import * as API from '../APIManager/API'
import {PostRequest, GetRequest} from '../APIManager/APISender'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        var isLogin = LS.GetItem(LS.KEY_ISLOGIN);
        var userAvatar = LS.GetItem(LS.KEY_AVATAR);
        var userName = LS.GetItem(LS.KEY_USERNAME);
        var userPasswd = LS.GetItem(LS.KEY_PASSWORD);
        var userAvatarPreview = null;
        console.log(userAvatar);
        if(userAvatar == null){
            userAvatarPreview = DefaultAvatar;
        }
        else {
            /* base64编码 */
            userAvatarPreview = userAvatar;
            LS.urltoFile(userAvatar, "cacheAvatar.png", "data:image/png").then((file) => { 
                this.state.userAvatar = file;
            });
        }
        this.state = {
            isLogin : isLogin,
            userAvatar: userAvatar,
            userName : userName,
            userPasswd : userPasswd,
            userAvatarPreview : userAvatarPreview
        }    

        this.onAvatarChange = this.onAvatarChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    
    onAvatarChange(e){
        //console.log(e.target.files[0].size);
        if(e.target.files[0].size > 1024 * 1024){
            alert("图片不能大于1MB");
            return;
        }
        this.setState({ 
            userAvatar: e.target.files[0],
            userAvatarPreview : URL.createObjectURL(e.target.files[0])
        }, () => {
            if(LS.GetItem(LS.KEY_AVATAR) != null)
                LS.RemoveItem(LS.KEY_AVATAR);    
            console.log(this.state.userAvatar);
            LS.getBase64(this.state.userAvatar).then(base64 => {
                console.log("file stored",base64);
                LS.SetItem(LS.KEY_AVATAR, base64);        
            });
        });
    }

    handleLogin(e) {
        var userName = this.state.userName;
        var userPasswd = this.state.userPasswd;
        GetRequest([userName, userPasswd], API.API_LOGIN_USER, (res) => {
            
        });
    }

    handleRegister(e) {
        console.log(this.state.userAvatar);
    }
    
    renderElement(){
        if(this.state.isLogin === true){
            return (
                <div>
                </div>
            )
        }
        else {
            return (
                <div className="profile-entry-container">
                    <div className="avatar-container">
                        <Image  
                                height={100}
                                width={100}
                                src={this.state.userAvatarPreview} roundedCircle />
                        <OverlayTrigger
                            placement="top"
                            overlay={(
                                <Tooltip style={{marginBottom: `10px`}}>
                                    上传头像
                                </Tooltip>
                            )}>
                            <label
                                className="upload-overlay" 
                                for="upload-avatar">
                                <Image
                                    height={100}
                                    width={100}
                                    src={UploadOverlay} 
                                    roundedCircle />
                            </label>

                        </OverlayTrigger>
                        <input 
                            style={{position: 'absolute'}}
                            id="upload-avatar" 
                            className="upload-avatar-input"
                            type="file"
                            onChange={this.onAvatarChange}>
                        </input>
                    </div>
                    <Form>
                        <Form.Group>
                            <Form.Label>用户名</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="输入用户名"
                                onChange={(e) => {
                                    this.setState({
                                        userName: e.target.value
                                    });
                                }} />
                            <Form.Text className="text-muted">
                                DPSV从不会泄漏您的隐私
                            </Form.Text>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>密&nbsp;&nbsp;&nbsp;码</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="输入密码"
                                onChange={(e) => {
                                    this.setState({
                                        userPasswd: e.target.value
                                    });
                                }}  />
                        </Form.Group>

                        <Form.Group >
                            <Form.Check type="checkbox" label="记住我" />
                        </Form.Group>
                        <div className="form-footer">
                            <Button 
                                style={{fontWeight: `bold`}} 
                                variant="dark" 
                                onClick={this.handleLogin}>
                                登&nbsp;&nbsp;&nbsp;录
                            </Button>

                            <Button 
                                style={{fontWeight: `bold`}} 
                                variant="dark" 
                                onClick={this.handleRegister}>
                                注&nbsp;&nbsp;&nbsp;册
                            </Button>
                        </div>
                    </Form>
                </div>
            )
        }
    }
    
    render(){
        return (
            <div className="profile-container">
                {this.renderElement()}
            </div>
        )
    }
}

export default Profile
