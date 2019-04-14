import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import MainApp from '../components/CMainAppP';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class MainAppPage extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <MainApp />
                </div>
                <BottomMenu />
            </div>
        )
    }
}

export default withRouter(MainAppPage)