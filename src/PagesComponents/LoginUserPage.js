import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import MainLoginU from '../components/CMainLoginU';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class LoginUserPage extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <MainLoginU />
                </div>
                <BottomMenu />
            </div>
        )
    }

}

export default withRouter(LoginUserPage)