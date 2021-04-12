import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BaseCard } from '../component/Card';
import { FakeVideoData } from './FakeVideoData';
import "./HomePage.css"
import * as FaIcons from "react-icons/fa"
import { IconContext } from 'react-icons';

class HomePage extends React.Component {
    render() {
        return (
            <div className="scroll">
                <Container>
                    <Row>
                    {
                        FakeVideoData.map((video, index) => {
                            return (
                                <Col key={index}
                                    md={4} 
                                    sm={6}>
                                    <BaseCard>
                                        <div className="header-container">
                                            <div className="user-avatar">
                                                
                                            </div>
                                            <div className="user-info">

                                            </div>
                                        </div>
                                        <div className="video-container">
                                            <video src={video.video_src}/>
                                        </div>
                                        <div className="footer-container">
                                            <div className="action-container">
                                                <IconContext.Provider value={{color: 'var(--red-color)'}}>
                                                    <FaIcons.FaHeart/>
                                                </IconContext.Provider>
                                            </div>
                                            <div className="video-info">

                                            </div>
                                        </div>
                                    </BaseCard>
                                </Col>
                            )
                        })
                    }
                    </Row>
                </Container>
            </div>
        )
    }
}

export default HomePage