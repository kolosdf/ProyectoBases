import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import Mapp from '../components/CConduServPage';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class InService extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <Mapp />
                </div>
                <BottomMenu />
            </div>
        )
    }

}
export default withRouter(InService);