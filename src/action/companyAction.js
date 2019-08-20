import { ADD_COMPANY, GET_COMPANIES, DELETE_COMPANY, UPDATE_COMPANY } from './types';
import axios from 'axios';
import JSONbig from 'json-bigint';
import BigInt from "big-integer";
// This method adds a company entry in the DynamoDB using api
// @param companyData: companyData Object, for example: {'name':'google', 'catalog':'tech', status:'1'}
// @param store_hash: the store_hash for the shopify store. For example: edwaleong-0
export function addCompany(companyData, store_hash){
    return (
        function (dispatch)  {
            axios.post(`${process.env.REACT_APP_API_GATEWAY_URL}/core/${store_hash}/addCompany`, 
            {
                store_hash: "silk-jc",
                data:JSON.stringify(companyData)
            },
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "x-api-key": `${process.env.REACT_APP_API_GATEWAY_KEY}`
                },
            }).then (res => {
                if(res.status === 200){
                    // console.log(res.data);
                    dispatch({
                        type: ADD_COMPANY,
                        payload: res.data
                    });
                }
                else{
                    console.log(res);
                }
            })
            .catch(console.log);
    });
}

export function getCompanies(store_hash){
    return (
        function (dispatch)  {
            axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}/core/edwaleong-0/getCompanies`, 
            {
                params: 
                {
                    "store_hash": store_hash
                },
                headers: 
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": `${process.env.REACT_APP_API_GATEWAY_KEY}`
                },
                // transformResponse: data => JSONbig.parse(data),
            })
            .then (res => {
                console.log(res.data);
                if(res.status === 200){
                    console.log(res.data)
                    dispatch({
                        type: GET_COMPANIES,
                        payload: res.data // send an array of sales rep objects to the reducer, and reducer will update state
                    });
                }

            })
            .catch(console.log);
    });
}


export function deleteCompany(store_hash, id){
    return (
        function (dispatch)  {
            console.log(typeof(id));
            axios.post(`${process.env.REACT_APP_API_GATEWAY_URL}/core/edwaleong-0/delCompany`, 
            {
                "store_hash": store_hash,
                "company_id": id
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
                    console.log(res.data)
                    dispatch({
                        type: DELETE_COMPANY,
                        company_id: id
                    });
                }

            })
            .catch(console.log);
    });
}

export function updateCompany(store_hash, id, companyData){
    return (
        function(dispatch){
            console.log("upadting");
            axios.post(
                `${process.env.REACT_APP_API_GATEWAY_URL}/core/edwaleong-0/updateCompany`, 
                {
                    store_hash: store_hash,
                    company_id:id,
                    data:JSON.stringify(companyData)
                },
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "x-api-key": `${process.env.REACT_APP_API_GATEWAY_KEY}`
                    },
                }).then (res => {
                    console.log(res);
                    if(res.status === 200){
                        dispatch({
                            type: UPDATE_COMPANY,
                            company_id: id, 
                            payload: res.data.Attributes.data
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