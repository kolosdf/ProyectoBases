import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import ConduTravelPage from '../components/CConduTravelPage';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class ConduTravel extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <ConduTravelPage />
                </div>
                <BottomMenu />
            </div>
        )
    }

}
export default withRouter(ConduTravel);