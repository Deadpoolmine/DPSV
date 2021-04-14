import React from 'react'
import { Button, Col, Container, Row, Form } from 'react-bootstrap'
import { BaseCard } from '../component/Card'
import './UploadPage.css'
import uploadIcon from '../component/icons/upload.png'
import BaseVideo from '../component/BaseVideo'
import { PostRequest } from '../APIManager/APISender'
import * as API  from '../APIManager/API'


class UploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoCover : null,
            videoCoverPreview: null,
            videoSrc : null,
            videoSrcPreview: null,
            videoDescirption: "",
            videoTitle: ""
        }

        this.onCoverChange = this.onCoverChange.bind(this);
        this.onSrcChange = this.onSrcChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    onCoverChange(e){
        if(e.target.files[0] == null)
            return;
        this.setState({ 
            videoCover: e.target.files[0],
            videoCoverPreview : URL.createObjectURL(e.target.files[0])
        });
    }
    onSrcChange(e){
        if(e.target.files[0] == null)
            return;
        this.setState({ 
            videoSrc: e.target.files[0],
            videoSrcPreview : URL.createObjectURL(e.target.files[0])
        });
    }
    
    uploadSrc(){
        document.getElementById("upload-video-src").click();
    }
    
    handlePost(){
        var videoCover = this.state.videoCover;
        var videoSrc = this.state.videoSrc;
        var videoDescirption = this.state.videoDescirption;
        var videoTitle = this.state.videoTitle;
        
        if(videoCover == null)
        {
            alert("请上传封面");
            return;
        }
        if(videoSrc == null){
            alert("请上传视频");
            return;
        }
        if(videoTitle.length === 0){
            alert("请填写标题");
            return;
        }
        if(videoDescirption.length === 0){
            alert("请填写描述");
            return;
        }

        if(videoSrc.size > API.API_MAX_SRC_SIZE){
            alert("不得上传大于100MB的文件");
            return;
        }
        
        var formData = new FormData()
        console.log(videoSrc);
        console.log(videoCover);
        formData.append("video_src", videoSrc, videoSrc.name);
        formData.append("video_cover", videoCover, videoCover.name);
        formData.append("bgm_id", 1);
        formData.append("user_id", window.$User.user_id);
        formData.append("video_title", videoTitle);
        formData.append("video_description", videoDescirption);
        formData.append("video_duration", '00:01:02');
        formData.append("video_height", 100);
        formData.append("video_width", 100);

        PostRequest(formData, API.API_ADD_VIDEO, (res) => {
            console.log(res);
        });
    }

    render(){
        return (
            <div className="upload-container">
                <BaseCard>    
                    <Container style={{height:`100%`, padding: `2em`}}>
                        <Row style={{height:`100%`}}>
                            <Col md={4}>    
                                <div className="upload-col-container">
                                    <Row style={{height:`100%`}}>
                                        <BaseCard >
                                            <div className="upload-video-cover-container">
                                                <label 
                                                    className="upload-video-cover-preview"
                                                    htmlFor="upload-video-cover">
                                                    <div style={{position:'absolute', 
                                                                 display:`flex`, 
                                                                 justifyContent:`center`,
                                                                 flexDirection:`column`,
                                                                 alignItems:`center` }}>
                                                        <img 
                                                            style={{height:'30px', width:'30px', marginBottom:`1em`}}
                                                            src={uploadIcon} />
                                                        <div style={{color: `var(--font-light-color)`, fontSize:`0.5em`}}>
                                                            上 传 视 频 封 面
                                                        </div>
                                                    </div>
                                                    <img 
                                                        style={{position:'absolute', 
                                                                height:`100%`, 
                                                                width:`100%`,
                                                                borderRadius:`10px`,
                                                                display:this.state.videoCoverPreview == null ? `none` : `inherit`}}
                                                        src={this.state.videoCoverPreview} />
                                                </label>
                                                <input  style={{display:'none', position:`absolute`}}
                                                        type="file" 
                                                        id="upload-video-cover"
                                                        onChange={this.onCoverChange}></input>
                                            </div>
                                        </BaseCard>
                                    </Row>
                                    <Row style={{height:`100%`}}>
                                        <BaseCard>
                                            <Form style={{width:`90%`}}>
                                                <Form.Group >
                                                    <Form.Label>标&nbsp;&nbsp;&nbsp;题</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="给作品起个名字吧"
                                                        onChange={(e) => {
                                                            this.setState({
                                                                videoTitle: e.target.value
                                                            });
                                                        }}  />
                                                </Form.Group>
                                                <Form.Group >
                                                    <Form.Label>描&nbsp;&nbsp;&nbsp;述</Form.Label>
                                                    <Form.Control 
                                                        type="text" 
                                                        placeholder="描述一下您的作品吧..."
                                                        onChange={(e) => {
                                                            this.setState({
                                                                videoDescirption: e.target.value
                                                            });
                                                        }}  />
                                                </Form.Group>
                                                <Button 
                                                    style={{fontWeight:`bold`, marginTop:`2em`}} 
                                                    block 
                                                    variant="dark" 
                                                    onClick={this.handlePost}>
                                                    确&nbsp;&nbsp;&nbsp;认&nbsp;&nbsp;&nbsp;发&nbsp;&nbsp;&nbsp;布
                                                </Button>
                                            </Form>
                                        </BaseCard>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={8}>
                                <BaseCard >
                                    <div className="upload-video-src-container">
                                        <div className="upload-video-src-preview">
                                            <BaseVideo videoSrcPreview={this.state.videoSrcPreview}/>
                                        </div>
                                        <Button style={{fontWeight:`bold`}}
                                                variant="dark" 
                                                onClick={this.uploadSrc}>
                                            上 传 你 的 视 频
                                        </Button>
                                    </div>
                                        
                                    <input  style={{display:'none', position:`absolute`}}
                                            type="file" 
                                            id="upload-video-src"
                                            onChange={this.onSrcChange}></input>    
                                </BaseCard>
                            </Col>
                        </Row>
                    </Container>
                </BaseCard>
            </div>
        )
    }
}

export default UploadPage
