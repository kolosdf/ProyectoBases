import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import wait from '../components/CMainWait';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class WaitPage extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <wait />
                </div>
                <BottomMenu />
            </div>
        )
    }
}

export default withRouter(WaitPage)