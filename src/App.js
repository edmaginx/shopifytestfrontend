import React, { Component, Link } from "react";

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import RequestToken from './components/RequestToken';
import CreatePermissionUrl from './components/landing/CreatePermissionUrl';
import Landing from "./components/landing/Landing.js"
import DashBoard from "./components/landing/DashBoard"


import Tmp from './components/tmp'
import Install from "./components/landing/Install";
require('dotenv').config();
console.log(process.env.AWS_API_GATEWAY);
class App extends Component {
  constructor(){
    super();
  }

  render(){
    return (
      <div className="App">
        <head>
          <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/latest/polaris.css" />
        </head>
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
