import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import RequestToken from './components/RequestToken';
import CreatePermissionUrl from './components/landing/CreatePermissionUrl';
import Landing from "./components/landing/Landing.js"
import DashBoard from "./components/landing/DashBoard"


//import Tmp from './components/tmp'
import Install from "./components/landing/Install";
//require('dotenv').config();
// console.log('test');
// console.log(process.env.AWS_API_GATEWAY);
// console.log(process.env.REACT_APP_AWS_API_GATEWAY);
// console.log(process.env.NODE_ENV);
// console.log('test2');
class App extends Component {
  // constructor(){
  //   super();
  // }

  render(){
    return (
      <div className="App">
        <div>testing</div>


        <Router>
          <Route path="/shopify/install" component={ Install } />
          <Route path="/shopify/CreatePermissionUrl" component={ CreatePermissionUrl } />
          <Route path="/shopify/callback" component={ RequestToken } />
          <Route path="/shopify/test" component={ Landing } />
          <Route path="/shopify/dashboard" component={ DashBoard } />

        </Router>
      </div>
    );
  }
}


export default App;
