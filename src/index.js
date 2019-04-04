import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import Clock from './components/textClock.js';
//import MainLoginU from './components/CMainLoginU';
//import LoginUserPage from './PagesComponents/LoginUserPage';
import MainAppPage from './PagesComponents/MainAppPage';
//import MainApp from './components/CMainAppP';
//import MainLoginU from './components/CMainLoginU';
import { Switch, BrowserRouter, Route} from 'react-router-dom';
import LoginUserPage from './PagesComponents/LoginUserPage';
import LoginConduPage from './PagesComponents/LoginConduPage';
import MainUserPage from './PagesComponents/MainUserPage';
import MainConduPage from './PagesComponents/MainConduPage';
import SignInUserPage from './PagesComponents/SignInUserPage';
import SignInDriverPage from './PagesComponents/SignInDriver';


class Login extends React.Component {  
  render() {      
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={ () => <MainAppPage />} />
            <Route path='/User/Main' component={ () => <MainUserPage /> } />
            <Route path='/User' component={ () => <LoginUserPage /> } />
            <Route path='/SignIn/User' component={ () => <SignInUserPage /> } />
            
            <Route path='/SignIn/Driver' component={ () => <SignInDriverPage /> } />
            <Route path='/Driver/Main' component={ () => <MainConduPage /> } />
            <Route path='/Driver' component={ () => <LoginConduPage /> } />
            <Route path='*' component={ () => <MainAppPage />} />    

                         
          </Switch>
        </BrowserRouter>        
      );
    }
  }


// ========================================
ReactDOM.render(
        <Login />,
        document.getElementById('root')
);
