import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BaseCard, PrimaryCard } from '../component/Card';
import { FakeVideoData } from './FakeVideoData';
import "./HomePage.css"
import { GetRequest, PostRequest } from '../APIManager/APISender';
import * as API from '../APIManager/API';
import DetailPanel from '../component/DetailPanel';
import { withRouter } from 'react-router';


class HomePage extends React.Component {

    constructor(props) {
        super(props);

        var initData = []; 
        this.dataType = API.DEFAULT_DATA;

        if(props.dataType != null){
            this.dataType = props.dataType;
        }
        
        this.state = {
            videoData: initData,
            curVideoData: null,
            curUser: null,
            isActivePanel: false,
            isEditable: false,
            isDeletable: false
        }

        this.watcherStart = 0;
        this.watcherEnd = 0;

        this.handleDetail = this.handleDetail.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
    }

    componentDidMount() {
        if(this.dataType === API.DEFAULT_DATA){
            GetRequest([-1], API.API_GET_VIDEO, (res) => {
                console.log(res);
                if(res.state === API.STAT_OK){
                    this.setState({
                        videoData: res.data
                    });
                }
            });
        }
        else if(this.dataType === API.FAVORITE_DATA){
            if(window.$User == null){
                alert("请先登录");
                this.props.history.replace("/");
            }
            else {
                GetRequest([window.$User.user_id], API.API_GET_FAVORITE_VIDEO, (res) => {
                    console.log(res);
                    if(res.state === API.STAT_OK){
                        this.setState({
                            videoData: res.data
                        });
                    }
                });
            }
        }
        else if(this.dataType === API.SPEC_DATA){
            this.listener = setInterval(() => {
                var searchContent = this.props.searchContent;
                var preSearch = window.$PreSearch;
                if(searchContent === preSearch)
                    return;
                window.$PreSearch = searchContent;
                var formData = new FormData();
                formData.append("search_content", searchContent);
                PostRequest(formData, API.API_SEARCH_VIDEO, (res) => {
                    this.setState({
                        videoData: res.data
                    });
                })
            }, 1000);
        }
        else if(this.dataType === API.MY_DATA){
            if(window.$User == null){
                alert("请先登录");
                this.props.history.replace("/");
            }
            else {
                GetRequest([window.$User.user_id], API.API_GET_VIDEO_BY_USER, (res) => {
                    console.log(res);
                    if(res.state === API.STAT_OK){
                        this.setState({
                            videoData: res.data,
                            isEditable: true,
                            isDeletable: true
                        });
                    }
                });
            }
        }
    }
    
    componentWillUnmount(){
        if(this.listener)
            clearInterval(this.listener);

        window.$PreSearch = "";
    }

    handleDetail(video, user){
        console.log(video);
        console.log(user);
        this.setState({
            curUser: user,
            curVideoData: video,
            isActivePanel: true
        }, (res) => {
            this.watcherStart = new Date().getTime();
        });
    }

    handleEditVideo(video) {
        console.log(video);
        if(video != null){
            var video_id = video.video_id;
            var video_title = video.video_title;
            var video_description = video.video_description;

            var formData = new FormData();
            formData.append("video_id", video_id);
            formData.append("video_title", video_title);
            formData.append("video_description", video_description);

            PostRequest(formData, API.API_UPDATE_VIDEO, (res) => {
                if(res.state === API.STAT_OK){
                    alert("修改成功");
                }
                else {
                    alert("修改失败");
                }
                GetRequest([window.$User.user_id], API.API_GET_VIDEO_BY_USER, (res) => {
                    console.log(res);
                    if(res.state === API.STAT_OK){
                        this.setState({
                            videoData: res.data,
                            isEditable: true,
                            isDeletable: true
                        });
                    }
                });
            });
        }
    }

    handleDeleteVideo(video) {
        console.log(video);
        if(video != null){
            var video_id = video.video_id;
            GetRequest([video_id], API.API_DELETE_VIDEO, (res) => {
                if(res.state === API.STAT_OK){
                    alert("删除成功");
                }
                else{
                    alert("删除失败");
                }
                GetRequest([window.$User.user_id], API.API_GET_VIDEO_BY_USER, (res) => {
                    console.log(res);
                    if(res.state === API.STAT_OK){
                        this.setState({
                            videoData: res.data,
                            isEditable: true,
                            isDeletable: true
                        });
                    }
                });
            })
        }
    }
    
    togglePanel(){
        var isActivePanel = this.state.isActivePanel; 
        if(isActivePanel){
            this.watcherEnd = new Date().getTime();
            var duration = this.watcherEnd - this.watcherStart;
            if(window.$User)
                GetRequest([window.$User.user_id, this.state.curVideoData.video_id, duration], API.API_WATCH_VIDEO, (res) => ({
                }));
            this.setState({
                curUser: null,
                curVideoData: null,
                isActivePanel: !isActivePanel
            })
        }
        else {
            this.setState({
                isActivePanel: !isActivePanel
            });
        }
    }

    render() {
        return (
            <div className= {this.state.isActivePanel ? "home-container" : "home-container active"}>
                <Container>
                    <Row>
                    {
                        this.state.videoData.map((video, index) => {
                            return (
                                <Col key={video.video_id}
                                    md={4} 
                                    sm={6}>
                                    <PrimaryCard 
                                        onClick={(video, user) => {
                                            this.handleDetail(video, user);
                                        }} 
                                        isEditable={this.state.isEditable}
                                        handleEditVideo={(_video) => {
                                            this.handleEditVideo(_video);
                                        }}
                                        isDeletable={this.state.isDeletable}
                                        handleDeleteVideo={(_video) => {
                                            this.handleDeleteVideo(_video);
                                        }}
                                        videoData={video}/>
                                </Col>
                            )
                        })
                    }
                    </Row>
                </Container>

                <DetailPanel 
                    isActivePanel={this.state.isActivePanel}
                    videoData={this.state.curVideoData}
                    user={this.state.curUser}
                    togglePanel={this.togglePanel}
                    />
            </div>
        )
    }
}

export default withRouter(HomePage);