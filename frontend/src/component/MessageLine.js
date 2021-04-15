import React from 'react'
import { Image, Media } from 'react-bootstrap';


function MessageLine(props) {
    const user = props.user;
    const message = props.message;

    if(props.left){
        return (
            <Media  style={{margin:`1em 0`, width:`100%`}}>
                <Image
                    width={40}
                    height={40} 
                    src={user?.user_avatar} 
                    roundedCircle />
                <Media.Body style={{marginLeft:`1em`}}>
                    <div style={{display:`flex`, alignItems:`center`}}>
                        <div style={{fontWeight:`bold`,color:'var(--font-color)'}}>
                            {user?.user_nickname}  
                        </div>
                        <div style={{margin:`0 1em`,color:'var(--font-color)'}}>
                            · 
                        </div>
                        <div style={{color:`var(--font-light-color)`, fontSize:`0.7em`}}>
                            {message?.message_dt} 
                        </div>   
                    </div>
                    <p style={{color:`var(--font-light-color)`}}>
                        {message?.message_content}
                    </p>
                </Media.Body>
            </Media>
        )
    }
    else {
        return (
            <Media  style={{margin:`1em 0`, width:`100%`}}>
                <Media.Body style={{marginRight:`1em`, 
                                    display:`flex`, 
                                    flexDirection:`column`,
                                    alignItems:`flex-end`}}>
                    <div style={{display:`flex`, alignItems:`center`}}>
                        <div style={{color:`var(--font-light-color)`, fontSize:`0.7em`}}>
                            {message?.message_dt} 
                        </div>   
                        <div style={{margin:`0 1em`,color:'var(--font-color)'}}>
                            · 
                        </div>
                        <div style={{fontWeight:`bold`,color:'var(--font-color)'}}>
                            {user?.user_nickname}  
                        </div>
                    </div>
                    <p style={{color:`var(--font-light-color)`}}>
                        {message?.message_content}
                    </p>
                </Media.Body>
                <Image
                    width={40}
                    height={40} 
                    src={user?.user_avatar} 
                    roundedCircle />
            </Media>
        )
    }
}

export default MessageLine
