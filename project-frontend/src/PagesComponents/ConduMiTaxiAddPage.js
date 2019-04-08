import React from 'react';
import './Up&BottomMenu.css';
import UpMenu from '../components/SMenuBar';
import ConduMiTaxiAdd from '../components/CConduMiTaxiAdd';
import BottomMenu from '../components/BottomMenuBar';
import { withRouter } from 'react-router-dom';

class ConduMiTaxiAddPage extends React.Component{
    render(){
        return(
            <div className='main-containerBlack'>
                <div className='main-container'>
                    <UpMenu />

                    <ConduMiTaxiAdd />
                </div>
                <BottomMenu />
            </div>
        )
    }

}

export default withRouter(ConduMiTaxiAddPage)