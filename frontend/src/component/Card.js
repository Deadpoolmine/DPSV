import React from 'react'

import './Card.css'
import * as FaIcons from "react-icons/fa"
import * as BsIcons from 'react-icons/bs'
import { IconContext } from 'react-icons';
import { GetRequest, PostRequest } from '../APIManager/APISender';
import * as API from '../APIManager/API';
import { Image } from 'react-bootstrap';

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
            onClick: props.onClick
        }
        
        GetRequest([videoData.user_id], API.API_GET_USER, (res) => {
            console.log(res);
            this.setState({
                user: res.data[0]
            });
        });

        this.handleLike = this.handleLike.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
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
                        <div style={{wordSpacing:1, fontWeight:`bold`, fontSize:`0.9em`}}>
                            {this.state.user.user_nickname}
                        </div>
                        <div style={{fontSize:`0.5em`, color:`var(--font-color)`}}>
                            {this.state.user.user_description}
                        </div>
                    </div>
                </div>
                <div className="prim-video-cover-container" 
                     onClick={() => this.state.onClick(this.state.videoData, this.state.user)}>
                    <img className="prim-video-cover" src={this.state.videoData.video_cover}/>
                </div>
                <div className="prim-footer-container">
                    <div className="prim-action-container">
                        <div className="prim-action-icons">
                            <BsIcons.BsHeart onClick={this.handleLike}/>
                            <BsIcons.BsBookmarkPlus onClick={this.handleFavorite}/>
                        </div>
                        <div className="prim-action-description">
                            {this.state.videoData.video_like_cnt}个人赞了这个短视频
                        </div>
                    </div>
                    <div className="prim-video-info-container">
                        <div style={{fontWeight:`bold`}}>
                            "
                        </div>
                        <div className="prim-video-detail-container">
                            <div style={{fontWeight:`bold`}}>
                                {this.state.videoData.video_description}
                            </div>
                            <div style={{color:`var(--font-color)`, fontSize:`0.7em`}}>
                                {this.state.videoData.video_create_dt}
                            </div>
                        </div>
                    </div>
                </div>
            </BaseCard>
        )
    }    

}

export { BaseCard, PrimaryCard }
