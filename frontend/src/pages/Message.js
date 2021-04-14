import React, {useState} from 'react'
import { Container, Media, Image, Button, Modal, Form, FormControl } from 'react-bootstrap'
import { GetRequest } from '../APIManager/APISender';
import * as API from '../APIManager/API';
import { BaseCard } from '../component/Card';
import * as FaIcons from 'react-icons/fa'
import './Message.css'

function MessageBoxModal(props) {
    var [message, setMessage] = useState("");
    
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{fontWeight:`bold`}} id="contained-modal-title-vcenter">
            私 信
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="message-list-container">
                awd
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Container>
                <Form inline style={{display:`flex`}}>
                    <FormControl 
                        style={{width:`-1`, flex:`1`}} 
                        type="text" 
                        placeholder="写下你想说的话吧..." 
                        className=" mr-sm-2"
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}  />
                    <Button
                        variant="dark" 
                        style={{display:`flex`, alignItems:`center`, height: `100%`}}>
                        <FaIcons.FaCommentDots />            
                    </Button>
                </Form>
            </Container>
        </Modal.Footer>
      </Modal>
    );
}


class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            followers: [],
            modalShow: false
        }
        if(window.$User != null)
            GetRequest([window.$User.user_id], API.API_GET_FOLLOWERS, (res) => {
                console.log(res);
                this.setState({
                    followers: res.data
                });
            });
        else
            alert("请先登录");
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
            <div className="message-container">
                <Container>
                   {
                       this.state.followers.map((follower, index) => {
                           return (
                                <BaseCard key={index}>
                                    <Media style={{padding:`2em`, width:`100%`}}>
                                        <Image
                                            width={60}
                                            height={60} 
                                            src={follower?.user_avatar} 
                                            roundedCircle />
                                        <Media.Body style={{marginLeft:`1em`}}>
                                            <div className="follow-info-container">
                                                <div>
                                                    <div style={{fontWeight:`bold`}}>
                                                        {follower?.user_nickname}
                                                    </div>
                                                    <div style={{color:`var(--font-color)`}}>
                                                        {follower?.user_description}
                                                    </div>
                                                </div>
                                                <Button 
                                                    variant="light" 
                                                    style={{fontWeight:`bold`}}
                                                    onClick={() => this.setModalShow()}>
                                                    &nbsp;私 信&nbsp;
                                                </Button>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </BaseCard>
                           )
                       })
                   } 
                </Container>
                <MessageBoxModal
                    onConfirmReply={()=>{}}
                    style={{zIndex:9999999}}
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                />
            </div>
        )
    }
}

export default Message
