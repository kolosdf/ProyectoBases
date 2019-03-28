import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Clock from './components/textClock.js';
import UpMenu from './SemanticCompnt/SMenuBar';
import MainLoginU from './components/CMainLoginU';
import BottomMenu from './components/BottomMenuBar';


class Login extends React.Component {  
  render() {      
      return (                         
          <div className='main-containerBlack'>
            <div className='main-container'>
              <UpMenu />

              <MainLoginU />
            </div>
            
            <BottomMenu />
          </div>        
      );
    }
  }


// ========================================
ReactDOM.render(
        <Login />,
        document.getElementById('root')
);
