import React, { Component } from 'react'
import { connect } from "react-redux";
import { getCustomers } from '../action/customerAction'

class Tmp extends Component {
    componentWillMount(){
        this.props.getCustomers();
    }
    render() {
        // const items = this.props.customers.map(customer => (
        //     <div key = {customer.id}>
        //         <h3>{customer.name}</h3>
        //     </div>
        // ));
        return (
            <div>
                <h1>{this.props.customera}</h1>
                {console.log(this.props.customera)}
                {/* {items} */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customers: state.customera.customers
});

export default connect(mapStateToProps, { getCustomers })(Tmp);