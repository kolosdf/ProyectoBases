import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import SignInDriver from '../components/CMainSignInDrivers';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class SignInConduPage extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <SignInDriver />
                </div>
                <BottomMenu />
            </div>
        )
    }

}

export default withRouter(SignInConduPage)