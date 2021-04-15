import React, {useState} from 'react'

import './Card.css'
import * as FaIcons from "react-icons/fa"
import * as BsIcons from 'react-icons/bs'
import * as RiIcons from 'react-icons/ri'
import { IconContext } from 'react-icons';
import { GetRequest, PostRequest } from '../APIManager/APISender';
import * as API from '../APIManager/API';
import { Image, OverlayTrigger, Tooltip , Modal, Col, Button, Row, Container, Form, FormControl} from 'react-bootstrap';



function EditInfoModal(props) {
    var [videoTitle, setVideoTitle] = useState("");
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
                        placeholder="标 题" 
                        onChange={(e) => {
                            console.log(e);
                            setVideoTitle(e.target.value);
                        }}/>
                </Form.Group >
                <Form.Group className="form-group">
                    <Form.Control 
                        type="plaintext" 
                        placeholder="视 频 描 述" 
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
                            props.onConfirmReply(videoTitle, description);
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


function BaseCard(props) {
    return (
        <div className='base-card-container'>
            <div className="base-card">
                {props.children}
            </div>
        </div>
    )
}

class PrimaryCard extends React.Component {
    constructor(props) {
        super(props);
        var videoData = props.videoData;

        this.state = {
            user: {},
            videoData: videoData,
            onClick: props.onClick,
            handleDeleteVideo: props.handleDeleteVideo,
            handleEditVideo: props.handleEditVideo,
            isEditable: props.isEditable,
            isDeletable: props.isDeletable,
            modalShow: false
        }
        
        GetRequest([videoData.user_id], API.API_GET_USER, (res) => {
            console.log(res);
            this.setState({
                user: res.data[0]
            });
        });

        this.handleLike = this.handleLike.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
        this.onConfirmReply = this.onConfirmReply.bind(this);
    }

    handleLike(){
        var videoData = this.state.videoData;
        var video_id = videoData.video_id;
        if(window.$User == null){
            alert("请先登录");
            return;
        }
        var user_id = window.$User.user_id;
        GetRequest([user_id, video_id], API.API_LIKE_VIDEO, (res)=>{
            alert("点赞成功");
            videoData.video_like_cnt += 1;
            this.setState({
                videoData : videoData
            });
        });
    }

    handleFavorite(){
        var videoData = this.state.videoData;
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

    onConfirmReply(videoTitle, description){
        var videoData = this.state.videoData;
        videoData.video_title = videoTitle;
        videoData.video_description = description;
        this.setState({
            videoData : videoData
        }, () => {
            this.setModalShow();
            this.state.handleEditVideo(this.state.videoData);
        })
    }
    
    render(){

        return (
            <BaseCard>
                <div className="prim-header-container">
                    <div className="prim-user-avatar">
                        <Image  
                            height={40}
                            width={40}
                            src={this.state.user.user_avatar} 
                            roundedCircle />
                    </div>
                    <div className="prim-user-info-container">
                        <div style={{wordSpacing:1, fontWeight:`bold`, fontSize:`0.9em`, color:`var(--font-color)`}}>
                            {this.state.user.user_nickname}
                        </div>
                        <div style={{fontSize:`0.5em`, color:`var(--font-light-color)`}}>
                            {this.state.user.user_description}
                        </div>
                    </div>
                    <div className="prim-edit-container">
                        <OverlayTrigger 
                                placement="bottom"
                                overlay={(
                                    <Tooltip>
                                        编 辑
                                    </Tooltip>
                                )}
                            >
                            <div 
                                className={this.state.isEditable ? "prim-edit active" : "prim-edit"}
                                onClick={()=>{
                                    this.setModalShow();
                                }}>
                                <RiIcons.RiEditCircleLine/>
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger 
                                placement="bottom"
                                overlay={(
                                    <Tooltip>
                                        删 除
                                    </Tooltip>
                                )}
                            >
                            <div
                                onClick={() => this.state.handleDeleteVideo(this.state.videoData)} 
                                className={this.state.isDeletable ? "prim-edit active" : "prim-edit"}>
                                <RiIcons.RiDeleteBin2Line/>
                            </div>
                        </OverlayTrigger>
                    </div>
                </div>
                <div className="prim-video-cover-container" 
                     onClick={() => this.state.onClick(this.state.videoData, this.state.user)}>
                    <img className="prim-video-cover" src={this.state.videoData.video_cover}/>
                </div>
                <div className="prim-footer-container">
                    <div className="prim-action-container">
                        <div className="prim-action-icons">
                            <OverlayTrigger 
                                placement="right"
                                overlay={(
                                    <Tooltip>
                                        点 赞 ~
                                    </Tooltip>
                                )}>
                                <BsIcons.BsHeart onClick={this.handleLike}/>
                            </OverlayTrigger>
                            <OverlayTrigger 
                                placement="left"
                                overlay={(
                                    <Tooltip>
                                        收 藏 +
                                    </Tooltip>
                                )}>
                                <BsIcons.BsBookmarkPlus onClick={this.handleFavorite}/>
                            </OverlayTrigger>
                        </div>
                        <div className="prim-action-description">
                            {this.state.videoData.video_like_cnt}个人赞了这个短视频
                        </div>
                    </div>
                    <div className="prim-video-info-container">
                        <div style={{fontWeight:`bold`, color:`var(--font-color)`}}>
                            "
                        </div>
                        <div className="prim-video-detail-container">
                            <div style={{fontWeight:`bold`, color:`var(--font-color)`}}>
                                {this.state.videoData.video_description}
                            </div>
                            <div style={{color:`var(--font-light-color)`, fontSize:`0.7em`}}>
                                {this.state.videoData.video_create_dt}
                            </div>
                        </div>
                    </div>
                </div>
                <EditInfoModal 
                    onConfirmReply={(videoTitle, description) => this.onConfirmReply(videoTitle, description)}
                    style={{zIndex:9999999}}
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow()}
                />
            </BaseCard>
        )
    }    

}

export { BaseCard, PrimaryCard }
