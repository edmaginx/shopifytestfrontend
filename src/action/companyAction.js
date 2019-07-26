import { ADD_COMPANY } from './types';
import axios from 'axios';


// This method adds a company entry in the DynamoDB using api
// @param companyData: companyData Object, for example: {'name':'google', 'catalog':'tech', status:'1'}
// @param store_hash: the store_hash for the shopify store. For example: edwaleong-0
export function addCompany(companyData, store_hash){
    return (
        function (dispatch)  {
            axios.post(`${process.env.REACT_APP_API_GATEWAY_URL}/core/${store_hash}/addCompany`, 
            {
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
                    dispatch({
                        type: ADD_COMPANY,
                        companyData: companyData
                    });
                }
                else{
                    console.log(res);
                }
            })
            .catch(console.log);
    });
}


// TODO: missing api endpoints for fetching all companies


