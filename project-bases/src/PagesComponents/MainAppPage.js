import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import MainApp from '../components/CMainAppP';
import BottomMenu from '../components/BottomMenuBar';

export default class LoginUserPage extends React.Component{
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