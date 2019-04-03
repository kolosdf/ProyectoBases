import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Clock from './components/textClock.js';
//import MainLoginU from './components/CMainLoginU';
//import LoginUserPage from './PagesComponents/LoginUserPage';
import MainAppPage from './PagesComponents/MainAppPage';



class Login extends React.Component {  
  render() {      
      return (
          <div>
            <MainAppPage></MainAppPage>
            
          </div>              
      );
    }
  }


// ========================================
ReactDOM.render(
        <Login />,
        document.getElementById('root')
);
