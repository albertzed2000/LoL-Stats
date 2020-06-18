import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";

import IndexPage from "./components/IndexPage"
import UserNotFound from './components/UserNotFound';
import UserStats from './components/UserStats';
import About from "./components/About"
class App extends React.Component {
  
  render(){
    return (
        <div className='whole indexOmbreBottom container-fluid'>

        <Router>
          <div className="routesDiv">
            
            <Route path="/" exact component={IndexPage} />
            <Route path="/user-not-found" component={UserNotFound} />
            <Route path="/user/:username" component={UserStats} />
            <Route path="/about" component={About}/>
          </div>
        </Router>


        </div>
    );
  }
}

export default App;