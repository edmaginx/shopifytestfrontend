import React, { Component } from "react";
import axios from 'axios';
import queryString from 'query-string';
import { connect } from "react-redux";
import { storeOrigin, storeToken } from '../action/landingAction'
import createApp from '@shopify/app-bridge';
import {Redirect} from '@shopify/app-bridge/actions';

class RequestToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null
        };
    }


    render() {
        const app = createApp({
            // apiKey: `${process.env.REACT_APP_SHOPIFY_APP_API_KEY}`,
            apiKey: "2e222e5fc427a57adc4910868561c7a9",
            // shopOrigin: "edwaleong-0.myshopify.com",
            shopOrigin: localStorage.getItem('shopOrigin'),
            forceRedirect: true
        });
        const redirect = Redirect.create(app);
        const api_url = process.env.AWS_API_GATEWAY;
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token);
            this.props.storeToken(token);

            // Go to {shopUrl}/admin/customers
            redirect.dispatch(Redirect.Action.ADMIN_PATH, '/apps/oauth-testing');
        } else {
            const values = queryString.parse(this.props.location.search);
            axios.get(`${api_url}/core/0/requestToken`, {
                    params: {
                        "code": values.code,
                        "hmac": values.hmac,
                        "shop": values.shop,
                        "timestamp": values.timestamp
                    },
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "x-api-key": `${process.env.AWS_API_GATEWAY_KEY}`
                    },
                })
                .then(res => {
                    console.log(res.data);
                    console.log(res.data.token);
                    localStorage.setItem('token', res.data.token);
                    this.setState({
                        token: res.data.token
                    });
                    redirect.dispatch(Redirect.Action.ADMIN_PATH, '/apps/oauth-testing');
                }).catch(console.log);
        }
        return ( 
            <div> 
                Redirecting to app...
            </div>
        )
    }
}

const mapStateToProps = state => ({
    shopOrigin: state.landingState.shopOrigin,
    shopToken: state.landingState.shopToken
})

export default connect(mapStateToProps, { storeOrigin, storeToken })(RequestToken);
