import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import MainLoginC from '../components/CMainLoginC';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class LoginConduPage extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <MainLoginC />
                </div>
                <BottomMenu />
            </div>
        )
    }

}

export default withRouter(LoginConduPage)