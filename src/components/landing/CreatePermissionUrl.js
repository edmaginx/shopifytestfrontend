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


class CreatePermissionUrl extends Component {
    
    render() {
        const values = queryString.parse(this.props.location.search);
        console.log(values);
        localStorage.setItem("shopOrigin", values.shop + ".com");
        axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}/core/0/getStore`, {
            params: {
                "store_hash": values.shop.split('.')[0],
            },
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "x-api-key": `${process.env.REACT_APP_API_GATEWAY_KEY}`
                // "x-api-key": "q3g8DzjKRl64EQUHEFI4b4m7ef4n1yhl26CvXOwF"
            }
        }).then(res => {
            console.log(res);
            if (res.data) {
                console.log('yes')
                localStorage.setItem('token', res.data.token);
                // Redirect to another uri.
                window.location.href = "/shopify/callback";
            } else {
                axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}/core/0/createPermissionUrl`, {
                    params: {
                        "shop": values.shop
                    },
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "x-api-key": `${process.env.REACT_APP_API_GATEWAY_KEY}`
                    }
                }).then(res => {
                    console.log(res.data);
                    console.log(res.data.permission_url);
                    // const r = JSON.parse(res.data);
                    window.location.href = res.data.permission_url;
                }).catch(console.log);
            }
        }).catch(console.log);
        return null;
        // return(<div>success</div>);
    }
}

export default CreatePermissionUrl;