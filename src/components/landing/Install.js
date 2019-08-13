import React, { Component } from 'react'
import {AppProvider, Page, Card, Tabs, Button} from '@shopify/polaris';
import queryString from 'query-string';

class Install extends Component {
    render() {
        const shop = queryString.parse(this.props.location.search).shop;
        console.log(shop);
        return (
        <AppProvider>
          <Button primary url={`/shopify/createPermissionUrl?shop=${shop}`}>
            Install App
          </Button>
        </AppProvider>
        )
    }
}

export default Install;

