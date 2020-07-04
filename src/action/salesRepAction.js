import { GET_SALESREP, ADD_SALESREP, GET_ADMINS, DELETE_USER, UPDATE_USER } from './types';
import axios from 'axios';

export function getUsers(store_hash){
    return (
        function (dispatch)  {
            console.log(store_hash);
            axios.get(`${process.env.REACT_APP_AWS_API_GATEWAY}/core/edwaleong-0/getUsers`, 
            {
                params: 
                {
                    'store_hash': store_hash
                },
                headers: 
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": `${process.env.REACT_APP_AWS_API_GATEWAY_KEY}`
                }
            })
            .then (res => {
                if(res.status === 200){
                    console.log(res.data)
                    dispatch({
                        type: GET_SALESREP,
                        payload: res.data // send an array of sales rep objects to the reducer, and reducer will update state
                    });
                    dispatch({
                        type: GET_ADMINS,
                        payload: res.data // send an array of sales rep objects to the reducer, and reducer will update state
                    });
                }

            })
            .catch(console.log);
    });
}

export function addSalesRep(salesrepData, store_hash, company_id, company_ids){
    return (
        function (dispatch)  {
            axios.post(`${process.env.REACT_APP_AWS_API_GATEWAY}/core/edwaleong-0/addUser`, 
            {
                "store_hash": store_hash,
                "user_id": Math.floor(Math.random() * 1000000000000000).toString(),
                "company_id": company_id, // ?what is this id for
                "company_ids": company_ids,
                "data":JSON.stringify(salesrepData),
                "role":"salesrep"
            },
            {
                headers: 
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": `${process.env.REACT_APP_AWS_API_GATEWAY_KEY}`
                }
            })
            .then (res => {
                if(res.status === 200){
                    console.log(res.data);
                    dispatch({
                        type: ADD_SALESREP,
                        payload: res.data
                    });
                }

            })
            .catch(console.log);
    });
}

export function deleteUser(store_hash, user_id){
    return (
        function (dispatch)  {
            axios.post(`${process.env.REACT_APP_AWS_API_GATEWAY}/core/edwaleong-0/delUser`, 
            {
                "store_hash": store_hash,
                "user_id": user_id
            },
            {
                headers:
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": `${process.env.REACT_APP_AWS_API_GATEWAY_KEY}`
                }
            })
            .then (res => {
                if(res.status === 200){
                    console.log(res.data)
                    dispatch({
                        type: DELETE_USER,
                        user_id: user_id
                    });
                }

            })
            .catch(console.log);
    });
}

export function updateUser(store_hash, user_id, data){
    return (
        function(dispatch){
            console.log("upadting");
            axios.post(
                `${process.env.REACT_APP_AWS_API_GATEWAY}/core/edwaleong-0/updateUser`, 
                {
                    store_hash: store_hash,
                    user_id: user_id,
                    company_ids:data.company_ids,
                    role: data.role,
                    data: JSON.stringify(data.info)
                },
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "x-api-key": `${process.env.REACT_APP_AWS_API_GATEWAY_KEY}`
                    },
                }).then (res => {
                    console.log(res);
                    if(res.status === 200){
                        dispatch({
                            type: UPDATE_USER,
                            user_id: user_id, 
                            payload: res.data.Attributes
                        });
                    }
                    else{
                        console.log(res);
                    }
                })
                .catch(console.log);
        }
    );
}


