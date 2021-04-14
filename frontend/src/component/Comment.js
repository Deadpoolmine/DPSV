import React from 'react'
import { Media, Image, Button } from 'react-bootstrap'
import {GetRequest} from '../APIManager/APISender';
import * as API from '../APIManager/API';
import './Comment.css'

class Comment extends React.Component {

    constructor(props) {
        super(props);
        var comment = props.comment;
        this.state = {
            comment: comment,
            toUserNickName: "",
            user: {},
            reply: "",
            replyHander: props.replyHander
        }

        GetRequest([comment.user_id], API.API_GET_USER, (res) => {
            console.log(res);
            this.setState({
                user: res.data[0]
            });
        });

        GetRequest([comment.comment_id], API.API_GET_REPLY, (res) => {
            console.log(res);
            if(res.data.length == 0){
                return;
            }
            var toCommentId = res.data[0].reply_comment_id;
            console.log(toCommentId);
            GetRequest([toCommentId], API.API_GET_COMMENT_BY_ID, (res) => {
                console.log(res);
                var toComment = res.data[0];
                GetRequest([toComment.user_id], API.API_GET_USER, (res) => {
                    var toUserNickName = res.data[0].user_nickname;
                    toUserNickName = "@" + toUserNickName;
                    this.setState({
                        toUserNickName: toUserNickName 
                    });
                })
            })
        })
    }


    render(){
        return (
            <Media style={{margin:`1em 0`}}>
                <Image
                    width={40}
                    height={40} 
                    src={this.state.user?.user_avatar} 
                    roundedCircle />
                <Media.Body style={{marginLeft:`1em`}}>
                    <div style={{fontWeight:`bold`}}>
                        {this.state.user?.user_nickname}
                    </div>
                    <p style={{color:`var(--font-color)`}}>
                        {this.state.toUserNickName} {this.state.comment?.comment_content}
                    </p>
                    <div className="comment-footer-container">
                        <div></div>
                        <Button 
                            variant="light" 
                            style={{fontSize:`0.7em`, fontWeight:`bold`}}
                            onClick={() => this.state.replyHander(this.state.comment)}>
                            回 复
                        </Button>
                    </div>
                </Media.Body>
            </Media>
        )
    }
}

export default Comment
