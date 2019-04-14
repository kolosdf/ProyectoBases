import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import MWait from '../components/CMainWait';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class AddPlacesPage extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <MWait />
                </div>
                <BottomMenu />
            </div>
        )
    }
}

export default withRouter(WaitPage)