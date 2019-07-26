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
                if(res.status === 200){
                    console.log(res.data)
                    dispatch({
                        type: GET_SALESREP,
                        payload: res.data // send an array of sales rep objects to the reducer, and reducer will update state
                    });
                }

            })
            .catch(console.log);
    });
}

export function addSalesRep(salesrepData){
    return (
        function (dispatch)  {
            axios.post(`${process.env.REACT_APP_API_GATEWAY_URL}/core/edwaleong-0/addUser`, 
            {
                "store_hash": "edwaleong-0",
                "user_id": Math.floor(Math.random() * 10000000000000000000).toString(),
                "company_id": 14683980961532547561, // ? for some reason, the 3 trailing digits became 0 in db.
                "company_ids": [14683980961532547561],
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
