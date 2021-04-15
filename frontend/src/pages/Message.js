import React, {useState, useEffect} from 'react'
import { Container, Media, Image, Button, Modal, Form, FormControl } from 'react-bootstrap'
import { GetRequest, PostRequest } from '../APIManager/APISender';
import * as API from '../APIManager/API';
import { BaseCard } from '../component/Card';
import * as FaIcons from 'react-icons/fa'
import './Message.css'
import MessageLine from '../component/MessageLine';
import { withRouter } from 'react-router';

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
                {
                    props.messagelist.map((messageLine, index) => {
                        var me = window.$User;
                        var follower = props.curfollower;
                        if(messageLine.user_id === window.$User.user_id){
                            {/* 我发送的消息 */}
                            return (
                                <MessageLine user={me} message={messageLine} left/>
                            )
                        }
                        else {
                            {/* 对方发送的消息 */}
                            return (
                                <MessageLine user={follower} message={messageLine} right/>
                            )
                        }
                    })
                }
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
                        style={{display:`flex`, alignItems:`center`, height: `100%`}}
                        onClick={() => {
                            var follower = props.curfollower;
                            var message_user_id = follower.user_id;

                            var formData = new FormData();
                            formData.append("user_id", window.$User.user_id);
                            formData.append("message_user_id", message_user_id);
                            formData.append("message_content", message);
                            PostRequest(formData, API.API_ADD_MESSAGE, (res) => {
                                if(res.state === API.STAT_OK){
                                    alert("发送成功");
                                    props.onConfirmReply();
                                }
                                else {
                                    alert("发送失败");
                                }
                            })
                        }}>
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
            modalShow: false,
            curFollower: null,
            curmessagelist: []
        }
        if(window.$User != null){
            GetRequest([window.$User.user_id], API.API_GET_FOLLOWERS, (res) => {
                console.log(res);
                this.setState({
                    followers: res.data
                });
            });
        }
        else {
            alert("请先登录");
            this.props.history.replace("/");
        }
        
       
    }

    componentWillMount() {
        this.listener = setInterval(() => {
            this.getmessagelist();
        }, 1000);
    }

   componentWillUnmount() {
        clearInterval(this.listener);
   }

    getmessagelist(){
        if(this.state.curFollower != null){
            var follower = this.state.curFollower;
            var message_user_id = follower.user_id;
            var user_id = window.$User.user_id;
            GetRequest([user_id, message_user_id], API.API_GET_MESSAGE, (res) => {
                console.log(res);
                this.setState({
                    curmessagelist: res.data
                })
            });
        }
    }
    
    onConfirmReply(){
        this.getmessagelist();    
    }

    setModalShow(follower){
        if(this.state.modalShow){
            this.setState({
                modalShow: false,
                curFollower: null
            });
        }
        else {
            this.setState({
                modalShow: true,
                curFollower: follower
            }, () => {
                this.getmessagelist();
            });
        }
    }

    render(){
        return (
            <div className="message-container">
                <Container>
                   {
                       this.state.followers.map((follower, index) => {
                           return (
                                <BaseCard key={index}>
                                    <Media style={{padding:`2em`, width:`100%`, diplay:`flex`, alignItems:`center`}}>
                                        <Image
                                            width={60}
                                            height={60} 
                                            src={follower?.user_avatar} 
                                            roundedCircle />
                                        <Media.Body style={{marginLeft:`1em`}}>
                                            <div className="follow-info-container">
                                                <div>
                                                    <div style={{fontWeight:`bold`,color:`var(--font-color)`}}>
                                                        {follower?.user_nickname}
                                                    </div>
                                                    <div style={{color:`var(--font-light-color)`}}>
                                                        {follower?.user_description}
                                                    </div>
                                                </div>
                                                <Button 
                                                    variant="light" 
                                                    style={{fontWeight:`bold`}}
                                                    onClick={() => this.setModalShow(follower)}>
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
                    onConfirmReply={() => this.onConfirmReply()}
                    style={{zIndex:9999999}}
                    show={this.state.modalShow}
                    curfollower={this.state.curFollower}
                    onHide={() => this.setModalShow(false)}
                    messagelist={this.state.curmessagelist}
                />
            </div>
        )
    }
}

export default withRouter(Message)
