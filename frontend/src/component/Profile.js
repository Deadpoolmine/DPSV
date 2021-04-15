import React from 'react'
import { Image, OverlayTrigger, Tooltip, Form, FormControl, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import * as LS from '../utils/LocalStorage';
import './Profile.css'
import DefaultAvatar from './icons/logo.jpg'
import UploadOverlay from './icons/upload-avatar.png'
import * as API from '../APIManager/API'
import {PostRequest, GetRequest} from '../APIManager/APISender'
import PostBtn from './PostBtn';
import { withRouter } from 'react-router';
import { useState } from 'react';


function EditInfoModal(props) {
    var [nickName, setNickName] = useState("");
    var [description, setDescription] = useState("");

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight:`bold`}} id="contained-modal-title-vcenter">
            编 辑
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="form-group">
                    <Form.Control 
                        type="plaintext" 
                        placeholder="昵 称" 
                        onChange={(e) => {
                            console.log(e);
                            setNickName(e.target.value);
                        }}/>
                </Form.Group >
                <Form.Group className="form-group">
                    <Form.Control 
                        type="plaintext" 
                        placeholder="个 性 签 名" 
                        onChange={(e) => {
                            console.log(e);
                            setDescription(e.target.value);
                        }}/>
                </Form.Group >
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Container>
                <Row>
                    <Col>
                        <Button style={{fontWeight: `bold`, width: `100%`}} 
                                variant="dark" 
                                onClick={() => {
                            props.onConfirmReply(nickName, description);
                        }}>
                            确 定
                        </Button>
                    </Col>
                    <Col>
                        <Button onClick={props.onHide} 
                                style={{fontWeight: `bold`, width: `100%`}} 
                                variant="light" >
                            取 消
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Modal.Footer>
      </Modal>
    );
}

class Profile extends React.Component {
    constructor(props) {
        super(props);
        var userAvatar = LS.GetItem(LS.KEY_AVATAR);
        var userName = LS.GetItem(LS.KEY_USERNAME);
        var userPasswd = LS.GetItem(LS.KEY_PASSWORD);
        var userAvatarPreview = null;

        if(userAvatar == null){
            userAvatarPreview = DefaultAvatar;
        }
        else {
            /* base64编码 */
            userAvatarPreview = userAvatar;
            LS.urltoFile(userAvatar, Date() + ".png", "data:image/png").then((file) => { 
                this.state.userAvatar = file;
            });
        }

        this.state = {
            isLogin : false,
            userAvatar: userAvatar,
            userName : userName,
            userPasswd : userPasswd,
            userAvatarPreview : userAvatarPreview, 
            user: null,
            modalShow: false
        }    
        
        this.onAvatarChange = this.onAvatarChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onConfirmReply = this.onConfirmReply.bind(this);
    }
    
    onAvatarChange(e){
        console.log(e);
        if(e.target.files[0].size > 1024 * 1024){
            alert("图片不能大于1MB");
            return;
        }
        if(e.target.files[0].name.toLowerCase().indexOf(".png") === -1){
            alert("仅支持PNG格式图片");
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
        var formData = new FormData();
        formData.append("user_name", userName);
        formData.append("user_passwd", userPasswd);
        PostRequest(formData, API.API_LOGIN_USER, (res) => {
            console.log(res);
            if(res.state === API.STAT_FAIL){
                alert("未注册或密码错误");
                return;
            }
            else {
                this.setState({
                    isLogin : true,
                    userName : userName,
                    userPasswd : userPasswd,
                    user : res.data
                }, () => {
                    window.$User = res.data;
                    LS.SetItem(LS.KEY_PASSWORD, userPasswd);
                    LS.SetItem(LS.KEY_USERNAME, userName);
                    console.log(window.$User);
                });
            }
        });
    }

    handleRegister(e) {
        console.log(this.state.userAvatar);
        var userName = this.state.userName;
        var userPasswd = this.state.userPasswd;
        var userAvatar = this.state.userAvatar;
        var formData = new FormData(); 
        formData.append("user_name", userName);
        formData.append("user_passwd", userPasswd);
        formData.append("user_avatar", userAvatar, userAvatar.name);
        formData.append("user_nickname", "无 名");
        formData.append("user_description", "这个人很懒，还没有描述~");
        formData.append("user_bg", "");
        PostRequest(formData, API.API_ADD_USER, (res) => {
            console.log(res);
            if(res.state === API.STAT_OK){
                alert("注册成功!");
                window.$User = res.data;
                LS.SetItem(LS.KEY_PASSWORD, userPasswd);
                LS.SetItem(LS.KEY_USERNAME, userName);
                this.setState({
                    user : res.data
                });
                return;
            }
            else{
                alert("用户名不能重复!");
            }
        });
    }
    
    renderElement(){
        if(this.state.isLogin === true 
        || this.state.isLogin === 'true'){
            return (
                <div className="profile-detail-container">
                    <div className="avatar-border-container">
                        <Image  
                            height={100}
                            width={100}
                            src={this.state.user.user_avatar} 
                            roundedCircle />
                        <div className="avatar-border" />
                    </div>
                    <div className="user-info-container">
                        <div className="user-name">
                            {this.state.user.user_nickname}
                        </div>

                        <Button 
                            style={{fontWeight: `bold`, fontSize: `0.5em`}}  
                            variant="dark"
                            onClick={() => this.setModalShow()}>
                            编&nbsp;&nbsp;&nbsp;辑
                        </Button>

                        <div className="user-social-info">
                            <div className="user-social-item-container">
                                <div className="user-social-item-number">
                                    {this.state.user.user_subscribers_cnt}
                                </div>
                                <div className="user-social-item-descrption">
                                    订&nbsp;&nbsp;&nbsp;阅
                                </div>
                            </div>
                            <div style={{fontWeight:`bold`, margin:`1em`, fontSize: `1.5em`,color:`var(--font-color)`}}>
                                ·
                            </div>
                            <div className="user-social-item-container">
                                <div className="user-social-item-number">
                                    {this.state.user.user_followers_cnt}
                                </div>
                                <div className="user-social-item-descrption">
                                    关&nbsp;&nbsp;&nbsp;注
                                </div>
                            </div>
                        </div>
                        <div className="user-personal-description-container">
                            <div style={{fontWeight:`bold`,  marginBottom: `1em`,color:`var(--font-color)`}}>
                                个 性 签 名
                            </div>
                            <div style={{color:`var(--font-light-color)`, fontSize:`0.7em`}}>
                                {this.state.user.user_description}
                            </div>
                        </div>

                    </div>
                    <div style={{height:`30vh`, 
                                 width:`90%`, 
                                 display:`flex`, 
                                 alignItems:`center`,
                                 justifyContent:`center`}}>
                        <PostBtn>
                            <div style={{width:`100%`, display:`flex`, justifyContent:`center`}} onClick={() => {
                                  this.props.history.push('/UploadPage');
                            }}>
                                发&nbsp;&nbsp;&nbsp;布
                            </div>
                        </PostBtn>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="profile-entry-container">
                    <div className="avatar-border-container">
                        <div className="avatar-container">
                            <Image  
                                    height={100}
                                    width={100}
                                    src={this.state.userAvatarPreview} roundedCircle />
                            <div className="avatar-border" />
                        </div>
                        <OverlayTrigger
                            placement="top"
                            overlay={(
                                <Tooltip style={{marginBottom: `10px`}}>
                                    上传头像
                                </Tooltip>
                            )}>
                            <label
                                className="upload-overlay" 
                                htmlFor="upload-avatar">
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
                                * 不 超 过 12 位
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

    onConfirmReply(nickName, description){
        var user_id = window.$User.user_id;
        var formData = new FormData();
        formData.append("user_id",  user_id);
        formData.append("user_nickname", nickName);
        formData.append("user_description", description);
        PostRequest(formData, API.API_UPDATE_USER, (res) => {
            var user = this.state.user;
            user.user_nickname = nickName;
            user.user_description = description;
            this.setState({
                user: user
            });
            this.setModalShow();
        });
    }

    setModalShow(){
        if(this.state.modalShow)
            this.setState({
                modalShow: false
            });
        else
            this.setState({
                modalShow: true
            });
    }

    render(){
        return (
            <div className="profile-container">
                {this.renderElement()}
                <EditInfoModal 
                    onConfirmReply={(nickName, description) => this.onConfirmReply(nickName, description)}
                    style={{zIndex:9999999}}
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow()}/>
            </div>
        )
    }
}

export default withRouter(Profile)
