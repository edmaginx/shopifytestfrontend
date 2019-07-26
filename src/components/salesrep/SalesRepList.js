import React from 'react';
import SalesRep from './SalesRep';
import { connect } from "react-redux";
import { getSalesRep } from '../../action/salesRepAction'
class SalesRepList extends React.Component{
    componentWillMount(){
        this.props.getSalesRep();
    }
    
    render(){
        return(
            <div>
                <h1>"ddddd"</h1>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    salesRepresentative: state.salesRepresentative.salesReps
})

export default connect(mapStateToProps, { getSalesRep })(SalesRepList);
