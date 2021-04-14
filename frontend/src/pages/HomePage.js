import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BaseCard, PrimaryCard } from '../component/Card';
import { FakeVideoData } from './FakeVideoData';
import "./HomePage.css"
import { GetRequest } from '../APIManager/APISender';
import * as API from '../APIManager/API';
import DetailPanel from '../component/DetailPanel';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        var initData = null; 

        if(initData == null){
            initData = [];
        }
        
        this.state = {
            videoData: initData,
            curVideoData: null,
            curUser: null,
            isActivePanel: false
        }

        setTimeout(() => {
            GetRequest([-1], API.API_GET_VIDEO, (res) => {
                console.log(res);
                if(res.state === API.STAT_OK){
                    this.setState({
                        videoData: res.data
                    });
                }
            });
        }, 1000);

        this.handleDetail = this.handleDetail.bind(this);
        this.togglePanel = this.togglePanel.bind(this);
    }

    handleDetail(video, user){
        console.log(video);
        console.log(user);
        this.setState({
            curUser: user,
            curVideoData: video,
            isActivePanel: true
        });
    }

    togglePanel(){
        var isActivePanel = this.state.isActivePanel; 
        if(isActivePanel){
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
            <div className="home-container">
                <Container>
                    <Row>
                    {
                        this.state.videoData.map((video, index) => {
                            return (
                                <Col key={index}
                                    md={4} 
                                    sm={6}>
                                    <PrimaryCard 
                                        onClick={(video, user) => {
                                            this.handleDetail(video, user);
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

export default HomePage