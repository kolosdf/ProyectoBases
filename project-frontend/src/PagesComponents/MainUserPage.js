import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import MainUser from '../components/CMainUser';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class MainUserPage extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <MainUser />
                </div>
                <BottomMenu />
            </div>
        )
    }

}

export default withRouter(MainUserPage)