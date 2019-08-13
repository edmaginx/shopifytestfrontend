import React, {
    Component
} from "react";
// import { Redirect } from 'react-router-dom';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";
import axios from 'axios';
import queryString from 'query-string';
import { connect } from "react-redux";
import { storeOrigin } from '../action/landingAction'
import createApp from '@shopify/app-bridge';
import {Redirect} from '@shopify/app-bridge/actions';

class RequestToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null
        };
        console.log(props);
    }



    componentWillMount() {
        console.log(this.state.shopOrigin);
        const app = createApp({
            apiKey: `2e222e5fc427a57adc4910868561c7a9`,
            shopOrigin: "silk-jc.myshopify.com",
            forceRedirect: true
        });
        const redirect = Redirect.create(app);
        const api_url = process.env.REACT_APP_API_GATEWAY_URL;
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token);
            this.setState({
                token: token
            });

            // Go to {shopUrl}/admin/customers
            redirect.dispatch(Redirect.Action.ADMIN_PATH, '/apps/oauth-testing');

            // window.location.href = '/shopify/dashboard';
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
                        "x-api-key": `${process.env.REACT_APP_API_GATEWAY_KEY}`
                    },
                })
                .then(res => {
                    console.log(res.data);
                    console.log(res.data.token);
                    localStorage.setItem('token', res.data.token);
                    this.setState({
                        token: res.data.token
                    });
                    window.location.href = '/shopify/dashboard';
                }).catch(console.log);
        }
    }

    render() {
        return ( 
            <div> 
            {
                this.state.token
            } 
            </div>
        )
    }
}

const mapStateToProps = state => ({
    shopOrigin: state.landingState.shopOrigin,
})

export default connect(mapStateToProps, { storeOrigin })(RequestToken);
