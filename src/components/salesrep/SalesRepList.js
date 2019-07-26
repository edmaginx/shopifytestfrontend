import React from 'react';
import SalesRep from './SalesRep';
import { connect } from "react-redux";
import { getSalesRep, addSalesRep } from '../../action/salesRepAction'
import {
    Page,
    Card,
    DataTable,
    Modal,
    TextContainer,
    TextField
} from '@shopify/polaris';

class SalesRepList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            sortedRows: null,
            newSalesRep:{
                    "firstname": 'First Name',
                    "lastname": 'Last Name',
                    "email": 'Email Address'
            },
            addForm: false
        };
        props.getSalesRep();



        // Bind functions
        this.populateRow = this.populateRow.bind(this);
        this.displayAddSalesRep = this.displayAddSalesRep.bind(this);
        this.cancelAddSalesRep = this.cancelAddSalesRep.bind(this);
        this.addSalesRep = this.addSalesRep.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.salesRepresentativeObject){
            this.props.salesRepresentative.push(nextProps.salesRepresentativeObject);
        }
    }

    cancelAddSalesRep(){
        this.setState({
            addForm: false
        });
    }

    addSalesRep(){
        this.props.addSalesRep(this.state.newSalesRep);
        this.setState({
            addForm: false,
        });
    }

    handleChange(value, id){
        this.setState(
            prevState => {
                let newSalesRep = Object.assign({}, prevState.newSalesRep);
                if(id == 'FirstName') newSalesRep.firstname = value;
                else if(id == 'LastName') newSalesRep.lastname = value;
                else if(id == 'Email') newSalesRep.email = value;
                return {newSalesRep};
            }
        );
    };

    displayAddSalesRep() {
        this.setState({
            addForm: true,
        });
    }

    populateRow(){
        var Reps = this.props.salesRepresentative.map((salesRep) => {
            if(typeof(salesRep.data) === 'string'){
                var data = JSON.parse(salesRep.data);
            }else{
                var data = salesRep.data;
            }
            let name = `${data.firstname} ${data.lastname}`;
            let companyName = "something"; // todo fetch this salereps company name
            let email = data.email; // todo fetch email
            return(Array(name, companyName, email));    
        });
        return Reps;
    }

    render(){
        return(
            <div>
                <button onClick={this.displayAddSalesRep}>
                    Add Sales Representative
                </button>



                <Page title="Overview">
                    <Card>
                        <DataTable
                        columnContentTypes={[
                            'text',
                            'text',
                            'text'
                        ]}
                        headings={[
                            'Sales Rep Name',
                            'Company Name',
                            'Email'
                        ]}
                        rows={this.populateRow()}
                        sortable={[false, false, false]}
                        defaultSortDirection="descending"
                        />
                    </Card>
                </Page>


                <Modal
                open={this.state.addForm}
                onClose={this.cancelAddSalesRep}
                title="Create Sales Rep"
                primaryAction={{
                    content: 'Add Sales Rep',
                    onAction: this.addSalesRep,
                }}
                secondaryActions={[
                    {
                    content: 'Cancel',
                    onAction: this.cancelAddSalesRep,
                    },
                ]}
                >
                <Modal.Section>
                    <TextField
                        id = "FirstName"
                        label = "First Name"
                        value = {this.state.newSalesRep.firstname}
                        onChange = {this.handleChange.bind(this)} />
                    <TextField
                        id = "LastName"
                        label = "Last Name"
                        value = {this.state.newSalesRep.lastname}
                        onChange = {this.handleChange.bind(this)} />
                    <TextField
                        id = "Email"
                        label = "Email"
                        value = {this.state.newSalesRep.email}
                        onChange = {this.handleChange.bind(this)} />
                </Modal.Section>
                </Modal>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    salesRepresentative: state.salesRepresentative.salesReps,
    salesRepresentativeObject: state.salesRepresentative.salesRep
})

export default connect(mapStateToProps, { getSalesRep, addSalesRep })(SalesRepList);
