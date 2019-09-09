import React, { Component } from 'react'
import {AppProvider, Page, Card, Tabs, Button} from '@shopify/polaris';
import CompanyCardContainer from '../company/CompanyCardContainer';
import SalesRepList from "../salesrep/SalesRepList";

class DashBoard extends Component {

    state = {
        selected: 0
    }

    handleTabChange(selectedTabIndex){
        this.setState({
            selected: selectedTabIndex
        });
    }

    render() {
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
                }
                {
                    this.state.selected == 3 &&
                    <div>
                      <p>forth {this.state.selected} selected</p>
                    </div>

                }
              </Card.Section>
            </Card>
          </div>
        </AppProvider>
        )
    }
}

export default DashBoard;
