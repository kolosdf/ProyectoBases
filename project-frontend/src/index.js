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
import SignInConduPage from './PagesComponents/SignInDriverPage';
import ConduMiTaxiPage from './PagesComponents/ConduMiTaxiPage';
import ConduMiTaxiAddPage from './PagesComponents/ConduMiTaxiAddPage';
import ConduUbication from './PagesComponents/ConduUbication';


class Login extends React.Component {  
  render() {      
      return (
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={ () => <MainAppPage />} />
            
            <Route exact path='/SignIn/User' component={ () => <SignInUserPage /> } />
            <Route exact path='/User/Main' component={ () => <MainUserPage /> } />
            <Route exact path='/User' component={ () => <LoginUserPage /> } />
            
            <Route exact path='/SignIn/Driver' component={ () => <SignInConduPage /> } />
            <Route exact path='/Driver/Main/MiTaxi' component={ () => <ConduMiTaxiPage /> } />
            <Route exact path='/Driver/Main/MiTaxi/Map' component={ () => <ConduUbication /> } />
            <Route exact path='/Driver/Main/MiTaxi/AddTaxi' component={ () => <ConduMiTaxiAddPage /> } />
            <Route exact path='/Driver/Main' component={ () => <MainConduPage /> } />
            <Route exact path='/Driver' component={ () => <LoginConduPage /> } />
            
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
