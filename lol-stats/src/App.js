import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route} from "react-router-dom";

import IndexPage from "./components/IndexPage"

class App extends React.Component {
  
  render(){
    return (
      <Router>
        <div className="container">

        <Route path="/" exact component={IndexPage} />
        </div>
      </Router>
    );
  }
}

export default App;