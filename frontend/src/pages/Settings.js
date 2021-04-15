import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { BaseCard } from '../component/Card'
import './Settings.css'
import {changeTheme, THEME_DARK, THEME_LIGHT} from '../utils/Theme';
import * as LS from '../utils/LocalStorage';
import * as FaIcons from 'react-icons/fa'

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state  = {
            curTheme: LS.GetItem(LS.KEY_THEME)
        } 
    }

    renderElement(){
        if(this.state.curTheme === THEME_LIGHT){
            return (
                <div className="setting-container">
                    <BaseCard>
                        <Button variant="dark" style={{fontWeight:`bold`, diplay:`flex`,flexDirection:`row` , alignItems:`center`, justifyContent:`center`}} onClick={()=>{
                            changeTheme(true);
                            this.setState({
                                curTheme: THEME_DARK
                            })
                        }}>
                            <div>
                                <FaIcons.FaLightbulb /> 
                            </div>
                            <div>深 色 模 式</div>
                        </Button>
                    </BaseCard>            
                </div>
            )
        }
        else {
            return (
                <div className="setting-container">
                    <BaseCard>
                        <Button variant="light" style={{fontWeight:`bold`, diplay:`flex`,flexDirection:`row` , alignItems:`center`, justifyContent:`center`}} onClick={()=>{
                            changeTheme(true);
                            this.setState({
                                curTheme: THEME_LIGHT
                            })
                            console.log("dd");
                        }}>
                            <div>
                                <FaIcons.FaRegLightbulb /> 
                            </div>
                            <div>浅 色 模 式</div>
                        </Button>
                    </BaseCard>            
                </div>
            )
        }
    }

    render(){
        return (
            <div>
                {this.renderElement()}
            </div>
        )
    }
}

export default Settings
