import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import LoginPage from './components/pages/LoginPage';
import DashboardPage from './components/pages/DashboardPage';

function App() {
  const [user, setUser] = useState(null);


  return (
    <div className="App">
      <UserContext.Provider value={{user, setUser}}> 
        <BrowserRouter>
            <Switch>
              <Route exact path="/" component={user?.isLoggedIn ? DashboardPage : LoginPage} />
              <Route exact path="/dashboard" component={DashboardPage} />
              <Route path="/*">
                <Redirect to="/" />
              </Route>
            </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
