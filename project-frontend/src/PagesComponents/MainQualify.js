import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import MainCalificar from '../components/CMainQualify';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class MainQualify extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <MainCalificar />
                </div>
                <BottomMenu />
            </div>
        )
    }

}

export default withRouter(MainQualify)