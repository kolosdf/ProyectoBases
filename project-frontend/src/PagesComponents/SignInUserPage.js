import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import SignInUser from '../components/CMainSignInUser';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class SignInUserPage extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <SignInUser />
                </div>
                <BottomMenu />
            </div>
        )
    }

}

export default withRouter(SignInUserPage)