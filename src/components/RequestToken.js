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

class RequestToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null
        };
        console.log(props);
    }

    componentWillMount() {
        const api_url = process.env.REACT_APP_API_GATEWAY_URL;
        const token = localStorage.getItem('token');
        if (token) {
            console.log(token);
            this.setState({
                token: token
            });
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

export default RequestToken;
