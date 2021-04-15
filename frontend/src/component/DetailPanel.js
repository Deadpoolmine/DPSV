import React, { useState } from 'react'
import { Button, Col, Container, Image, Row,Form,FormControl, Modal } from 'react-bootstrap';
import BaseVideo from './BaseVideo';
import * as FaIcons from 'react-icons/fa';
import * as HiIcons from 'react-icons/hi'

import './DetailPanel.css'
import { GetRequest, PostRequest } from '../APIManager/APISender';
import * as API from '../APIManager/API';
import Comment from './Comment';
import { IconContext } from 'react-icons/lib';

function ReplyModal(props) {
    var [replyContent, setReplyContent] = useState("");

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight:`bold`}} id="contained-modal-title-vcenter">
            回 复
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="form-group">
                    <Form.Control 
                        type="plaintext" 
                        placeholder="回 复 内 容" 
                        onChange={(e) => {
                            console.log(e);
                            setReplyContent(e.target.value);
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
                            //alert(replyContent);
                            props.onConfirmReply(replyContent);
                        }}>
                            评 论
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


class DetailPanel extends React.Component {
    constructor(props) {
        super(props);

        this.handleLike = this.handleLike.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleFavorites = this.handleFavorites.bind(this);
        this.handleFollow = this.handleFollow.bind(this);
        this.onConfirmReply = this.onConfirmReply.bind(this);       

        this.state = {
            comments: [],
            comment: "",
            modalShow: false
        }

    }
    
    handleLike(){
        var videoData = this.props.videoData;
        var video_id = videoData.video_id;
        if(window.$User == null){
            alert("请先登录");
            return;
        }
        var user_id = window.$User.user_id;
        GetRequest([user_id, video_id], API.API_LIKE_VIDEO, (res)=>{
            alert("点赞成功");
            videoData.video_like_cnt += 1;
        });    
    }

    handleFavorites(){
        var videoData = this.props.videoData;
        var video_id = videoData.video_id;
        if(window.$User == null){
            alert("请先登录");
            return;
        }
        var user_id = window.$User.user_id;
        GetRequest([user_id, video_id], API.API_FAVORITE_VIDEO, (res)=>{
            alert("收藏成功");
        });    
    }

    handleFollow(){
        var user = this.props.user;
        var follow_user_id = user.user_id;
        if(window.$User == null){
            alert("请先登录");
            return;
        }
        var user_id = window.$User.user_id;
        GetRequest([user_id, follow_user_id], API.API_FOLLOW_USER, (res)=>{
            if(res.state === API.STAT_OK)
                alert("关注成功");
            else
                alert("不能关注自己");
        });    
    }

    handleComment(){
        if(window.$User == null){
            alert("请先登录");
            return;
        }
        var videoData = this.props.videoData;
        var comment = this.state.comment;
        var userId = window.$User.user_id;
        var formData = new FormData();
        formData.append("comment_content", comment);
        formData.append("video_id", videoData.video_id);
        formData.append("user_id", userId);
        PostRequest(formData, API.API_COMMENT_VIDEO, () => {
           this.getComments();
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

    handleReply(replyComment){
        if(window.$User == null){
            alert("请先登录");
            return;
        }
        this.setState({
            replyComment: replyComment
        })
        this.setModalShow();
    }

    getComments(){
        if(this.props.videoData) {
            GetRequest([this.props.videoData.video_id], API.API_GET_COMMENT , (res) => {
                console.log(res);
                this.setState({
                    comments: res.data
                });
            })
         }
        
    }

    componentDidUpdate(prevProps) {
        if(prevProps.isActivePanel === false){
            this.getComments();
        }
    }

    onConfirmReply(replyContent){
        this.setModalShow();
        if(replyContent.length == 0){
            alert("请填写回复内容");
            return;
        }  
        
        var formData = new FormData();
        formData.append("user_id", window.$User.user_id);
        formData.append("video_id", this.state.replyComment.video_id);
        formData.append("comment_content", replyContent);
        formData.append("reply_comment_id", this.state.replyComment.comment_id);

        PostRequest(formData, API.API_REPLY_COMMENT, (res) => {
            console.log(res);
            this.getComments();
        });
    }
    
    render(){
        return (
            <div className={this.props.isActivePanel ? "panel-container active" : "panel-container"} >
                <div className="panel">
                    <div className={this.props.isActivePanel ? "panel-background active" : "panel-background"} onClick={this.props.togglePanel}/>
                    <div className={this.props.isActivePanel ? "panel-body active" : "panel-body"}>
                        <Container style={{
                                            height: `100%`, 
                                            display:`flex`, 
                                            justifyContent:`center`}}>
                            <div className="panel-conatiner">
                                <div className="panel-close-btn">
                                    <IconContext.Provider value={{color:`var(--font-color)`}}>
                                        <FaIcons.FaChevronDown onClick={this.props.togglePanel}/>
                                    </IconContext.Provider>
                                </div>
                                <div className="panel-header-container">
                                    <Image 
                                        height={50}
                                        width={50}
                                        src={this.props.user ? this.props.user.user_avatar : null} 
                                        roundedCircle
                                        />
                                    <div className="panel-video-info-container">
                                        <div style={{fontWeight:`bold`, fontSize:`1.3em`, color:`var(--font-color)`}}>
                                            {this.props.videoData?.video_title}
                                        </div>
                                        <div style={{color:`var(--font-light-color)`, display:`flex`}}>
                                            © {this.props.user?.user_nickname} 
                                            <div style={{fontWeight:`bold`, margin:`0 1em`}}>
                                                · 
                                            </div>
                                            {this.props.videoData?.video_description}
                                        </div>
                                    </div>
                                    <div className="panel-action-container">
                                        <Button 
                                            variant="outline-dark" 
                                            style={{display:`flex`, alignItems:`center`, fontWeight:`bold`}}
                                            onClick={this.handleFollow}>
                                            <HiIcons.HiUserAdd/>&nbsp; 关 注
                                        </Button>
                                        <Button 
                                            variant="light" 
                                            style={{margin:`0 1em`,display:`flex`, alignItems:`center`, fontWeight:`bold`}}
                                            onClick={this.handleFavorites}>
                                            <FaIcons.FaBookmark/>&nbsp; 收 藏
                                        </Button>
                                        <Button 
                                            variant="dark" 
                                            style={{display:`flex`, alignItems:`center`, fontWeight:`bold`}}
                                            onClick={this.handleLike}>
                                            <FaIcons.FaHeart/> &nbsp; 点 赞 
                                        </Button>
                                    </div>
                                </div>
                                <BaseVideo videoSrcPreview={this.props.videoData?.video_src}/>
                                <div className="panel-footer-container">
                                    <div className="panel-comment-container">
                                        <Form inline style={{display:`flex`}}>
                                            <FormControl 
                                                style={{width:`-1`, flex:`1`}} 
                                                type="text" 
                                                placeholder="写下你想说的话吧..." 
                                                className=" mr-sm-2"
                                                onChange={(e) => {
                                                    this.setState({
                                                        comment: e.target.value
                                                    });
                                                }}  />
                                            <Button
                                                onClick={this.handleComment} 
                                                variant="dark" 
                                                style={{display:`flex`, alignItems:`center`, height: `100%`}}>
                                                <FaIcons.FaCommentDots />            
                                            </Button>
                                        </Form>
                                    </div>
                                    <div className="panel-check-comment-container">
                                        {
                                            this.state.comments.map((comment, index)=>{
                                                return (
                                                    <div key={index}>
                                                        <Comment
                                                            replyHander={(replyComment)=>{
                                                                this.handleReply(replyComment)
                                                            }} 
                                                            comment={comment}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>                          
                        </Container>
                        <ReplyModal 
                            onConfirmReply={(replyContent) => this.onConfirmReply(replyContent)}
                            style={{zIndex:9999999}}
                            show={this.state.modalShow}
                            onHide={() => this.setModalShow(false)}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailPanel
