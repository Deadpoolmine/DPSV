import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BaseCard } from '../component/Card'
import './UploadPage.css'

function UploadPage() {
    return (
        <div className="upload-container">
            <BaseCard>    
                <Container style={{height:`100%`, padding: `2em`}}>
                    <Row style={{height:`100%`}}>
                        <Col md={3}>    
                            <div className="upload-col-container">
                                <div>

                                </div>
                                <div>

                                </div>
                            </div>
                        </Col>
                        <Col md={9}>
                            <div className="upload-col-container">
                                <video/>     
                            </div>
                        </Col>
                    </Row>
                </Container>
            </BaseCard>
        </div>
    )
}

export default UploadPage
