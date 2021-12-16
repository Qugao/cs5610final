import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MyNavBar from "./MyNavBar";
import Login from "./UserLogInSignUp/Login"
export default function App() {
  return (<Router>
        <div className="App">
         <MyNavBar />
          <div className="auth-wrapper">
            <div className="auth-inner">
                <Route exact path='/' component={Login} />
                <Route path="/sign-in" component={Login} />
            </div>
          </div>
        </div>
  </Router>
  );
}