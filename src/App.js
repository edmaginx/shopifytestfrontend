import React, { Component, Link } from "react";

import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import RequestToken from './components/RequestToken';
import CreatePermissionUrl from './components/CreatePermissonUrl';
import CompanyCard from './components/company/CompanyCard';
import CompanyCardContainer from './components/company/CompanyCardContainer';
import {AppProvider, Page, Card, Tabs, Button} from '@shopify/polaris';
import SalesRepList from "./components/salesrep/SalesRepList";

// import {createStore, applyMiddleware} from 'redux';
// import {Provider} from "react-redux";
// import thunk from "redux-thunk";
// import reducer from "./reducer/index.js";

import Tmp from './components/tmp'

class App extends Component {
  // constructor(){
  //   this.installApp = this.installApp.bind(this);
  // }

  state = {
    selected: 2
  }

  handleTabChange(selectedTabIndex){
    this.setState({
        selected: selectedTabIndex
    });
  }

  render(){
    const tabs = [
      {
          id: "companies",
          content: 'Companies',
          accessbilityLabel: "All",
          panelID: 'companies-tab',
      },
      {
          id: "catalog",
          content: 'Catalog',
          accessbilityLabel: "All",
          panelID: 'catalog-tab',
      },
      {
          id: "sales-rep",
          content: 'Sales Rep',
          accessbilityLabel: "All",
          panelID: 'sales-rep-tab',
      },
      {
          id: "product-filtering",
          content: 'Product Filtering',
          accessbilityLabel: "All",
          panelID: 'product-filtering-tab',
      }
  ];

    return (
      <div className="App">
        <head>
          <link rel="stylesheet" href="https://sdks.shopifycdn.com/polaris/latest/polaris.css" />
        </head>
        {/* <AppProvider>
          This button is for navigating to the installation process
          <Button primary url="/shopify/install">
            Install App
          </Button>
        </AppProvider> */}
        <AppProvider>
          <div>
            <Card>
              <Tabs tabs={tabs} selected={this.state.selected} onSelect={this.handleTabChange.bind(this)} />
              <Card.Section title={tabs[this.state.selected].content}>
                {
                    this.state.selected == 0 &&
                    <div>
                        <CompanyCardContainer />
                    </div>                
                }
                {
                    this.state.selected == 1 &&
                    <p>second tab {this.state.selected} selected</p>
                }
                {
                    this.state.selected == 2 &&
                    <div>
                      <SalesRepList />
                    </div>
                    // <p>third tab {this.state.selected} selected</p>
                }
                {
                    this.state.selected == 3 &&
                    <div>
                      <p>forth {this.state.selected} selected</p>
                      <Tmp />
                    </div>
                    
                }
              </Card.Section>
            </Card>
          </div>
        </AppProvider>
        <Router>
          <Route path="/shopify/install" component={ CreatePermissionUrl } />
          <Route path="/shopify/callback" component={ RequestToken } />
        </Router>
      </div>
    );
  }
}


export default App;
