import { GET_SALESREP, ADD_SALESREP, GET_ADMINS } from './types';
import axios from 'axios';

export function getUsers(store_hash){
    return (
        function (dispatch)  {
            console.log(store_hash);
            axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}/core/edwaleong-0/getUsers`, 
            {
                params: 
                {
                    'store_hash': store_hash
                },
                headers: 
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": `${process.env.REACT_APP_API_GATEWAY_KEY}`
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
            axios.post(`${process.env.REACT_APP_API_GATEWAY_URL}/core/edwaleong-0/addUser`, 
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
                    "x-api-key": `${process.env.REACT_APP_API_GATEWAY_KEY}`
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
