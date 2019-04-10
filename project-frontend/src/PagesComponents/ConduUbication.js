import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import ConduUbicationPage from '../components/CConduUbicationPage';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class ConduUbication extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <ConduUbicationPage />
                </div>
                <BottomMenu />
            </div>
        )
    }

}
export default withRouter(ConduUbication);