// import React, {
//     Component
// } from "react";
import {
    Component
} from "react";
// import { Redirect } from 'react-router-dom';
// import {
//     BrowserRouter as Router,
//     Route
// } from "react-router-dom";
import axios from 'axios';
import queryString from 'query-string';
require('dotenv').config()


class CreatePermissionUrl extends Component {
    
    render() {
        const values = queryString.parse(this.props.location.search);
        //console.log(values);
        console.log(`${process.env.REACT_APP_AWS_API_GATEWAY}/core/0/getStore`);
        localStorage.setItem("shopOrigin", values.shop + ".com");
        console.log(`${process.env.REACT_APP_AWS_API_GATEWAY}/core/0/getStore`);
        if(values.shop.split('.')[0] === "undefined"){
            console.log("pass");
        } else{
            axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/core/0/getStore`, {
                params: {
                    "store_hash": values.shop.split('.')[0],
                },
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": `${process.env.REACT_APP_AWS_API_GATEWAY_KEY}`
                }
            }).then(res => {
                console.log(res);
                if (res.data) {
                    console.log('yes')
                    localStorage.setItem('token', res.data.token);
                    // Redirect to another uri.
                    window.location.href = "/shopify/callback";
                } else {
                    axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/core/0/createPermissionUrl`, {
                        params: {
                            "shop": values.shop
                        },
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "x-api-key": `${process.env.REACT_APP_AWS_API_GATEWAY_KEY}`
                        }
                    }).then(res => {
                        console.log(res.data);
                        console.log(res.data.permission_url);
                        // const r = JSON.parse(res.data);
                        window.location.href = res.data.permission_url;
                    }).catch(console.log);
                }
            }).catch(console.log);
        }
        return null;
        // return(<div>success</div>);
    }
}

export default CreatePermissionUrl;
