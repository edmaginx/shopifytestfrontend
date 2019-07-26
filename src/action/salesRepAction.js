import React, { Component } from 'react'
import { GET_SALESREP, ADD_SALESREP } from './types';
import axios from 'axios';

export function getSalesRep(){
    return (
        function (dispatch)  {
            axios.get(`${process.env.REACT_APP_API_GATEWAY_URL}/core/edwaleong-0/getSalesReps`, 
            {
                params: 
                {
                    "company_id": "14683980961532547561"
                    //TODO This company id needs to be dynamically passed in
                },
                headers: 
                {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": `${process.env.REACT_APP_API_GATEWAY_KEY}`
                }
            })
            .then (res => {
                console.log(res);
                dispatch({
                    type: GET_SALESREP,
                    payload: res
                });
            })
            .catch(console.log);
    });
}
