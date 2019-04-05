import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import MainCondu from '../components/CMainSignInUser';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class MainConduPage extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <MainCondu />
                </div>
                <BottomMenu />
            </div>
        )
    }

}

export default withRouter(MainConduPage)