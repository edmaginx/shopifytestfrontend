import { GET_CUSTOMERS } from './types';
import axios from 'axios';

export function getCustomers(){
    return (
        function (dispatch)  {
            axios.get(`${process.env.AWS_API_GATEWAY}/core/edwaleong-0/getCustomers`, 
            {
                params: 
                {
                    "token": "36de31ed80a8300e83d8a33abd95a535", // store token
                    // ? What is this id: "id": "1046947" 
                    // The api still works even without this id param
                },
                headers: 
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": `${process.env.AWS_API_GATEWAY_KEY}`
                }
            })
            .then (res => {
                console.log(res);
                dispatch({
                    type: GET_CUSTOMERS,
                    payload: res
                });
            })
            .catch(console.log);
    });
}
