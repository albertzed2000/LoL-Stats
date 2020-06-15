import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";

import IndexPage from "./components/IndexPage"
import UserNotFound from './components/UserNotFound';
import UserStats from './components/UserStats';

class App extends React.Component {
  
  render(){
    return (
      <Router>
        <div className="container">

        <Route path="/" exact component={IndexPage} />
        <Route path="/user-not-found" component={UserNotFound} />
        <Route path="/user/:username" component={UserStats} />
        </div>
      </Router>
    );
  }
}

export default App;