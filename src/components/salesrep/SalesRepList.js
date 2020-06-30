import React from 'react';
import { connect } from "react-redux";
import { getUsers, addSalesRep } from '../../action/salesRepAction'
import {
    // Page,
    Card,
    // DataTable,
    Modal,
    TextField,
    OptionList,
    // ResourceList
} from '@shopify/polaris';
import SalesRep from './SalesRep';

class SalesRepList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            sortedRows: null,
            newSalesRep:{
                    "firstname": 'First Name',
                    "lastname": 'Last Name',
                    "email": 'Email Address',
                    "phoneNumber": "Phone Number",
            },
            companySelected: [],
            addForm: false,
        };
        props.getUsers(props.store_hash);

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
        this.props.addSalesRep(
            this.state.newSalesRep, 
            this.props.store_hash,
            this.state.companySelected[0],
            this.state.companySelected);
        this.setState({
            addForm: false,
        });
    }

    handleChange(value, id){
        this.setState(
            prevState => {
                let newSalesRep = Object.assign({}, prevState.newSalesRep);
                if(id === 'FirstName') newSalesRep.firstname = value;
                else if(id === 'LastName') newSalesRep.lastname = value;
                else if(id === 'Email') newSalesRep.email = value;
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
        var Reps = this.props.salesRepList.map((salesRep) => {
            var data = salesRep.data;
            if(typeof(salesRep.data) === 'string'){
                data = JSON.parse(salesRep.data);
            }
            let name = `${data.firstname} ${data.lastname}`;
            let email = data.email; 
            
            let company = this.props.companies.filter((company) => {
                var idList = [];
                for(let i = 0; i < salesRep.company_ids.length; i ++){
                    idList.push(salesRep.company_ids[i]);
                }
                console.log(idList);
                return idList.includes(company.company_id);
            });
            // update companyname with actual company list, expandable
            if (company.length>0){
                let companyJSON = JSON.parse(company[0].data);
                let companyName = companyJSON.name;
                return([name, companyName, email]);
            }else{
                let companyName = "Not assigned any company yet";
                return ([name, companyName, email]);
            }
  
        });
        return Reps;
    }

    formatSalesRep(salesRep){
        console.log(salesRep);
        var data = salesRep.data;
        if(typeof(salesRep.data) === 'string'){
            data = JSON.parse(salesRep.data);
        }
        let name = `${data.firstname} ${data.lastname}`;
        let email = data.email; 
        let company = this.props.companies.filter((company) => {
            var idList = [];
            for(let i = 0; i < salesRep.company_ids.length; i ++){
                idList.push(salesRep.company_ids[i]);
            }
            return idList.includes(company.company_id);
        });
        // todo update companyname with actual company list, expandable
        if (company.length>0){
            let companyJSON = JSON.parse(company[0].data);
            let companyName = companyJSON.name;
            return({
                name:name, 
                companyName: companyName,
                email: email
            });
        }else{
            let companyName = "Not assigned any company yet";
            return({
                name:name, 
                companyName: companyName,
                email: email
            });
        }
    }

    render(){
        return(
            <div className="salesrep-list">
                <button onClick={this.displayAddSalesRep}>
                    Add Sales Representative
                </button>

                {/* <Page title="Overview">
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
                        rows={
                            this.populateRow()
                        }
                        sortable={[false, false, false]}
                        defaultSortDirection="descending"
                        />
                        <div>asdfadf</div>
                    </Card>
                </Page> */}
                <table className = "salesRepTable">
                    <thead>
                        <th></th>
                        <th>Sales Rep Name</th>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {this.props.salesRepList.map((salesRep) => <SalesRep salesRep = {salesRep} />)}
                    </tbody>
                </table>


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
                    <Card>
                        <OptionList
                            title="Manage sales channels availability"
                            onChange={(updated) => {
                                this.setState({companySelected: updated});
                            }}
                            options={
                                this.props.companies.map((company) => {
                                    return {
                                        value: company.company_id,
                                        label: JSON.parse(company.data).name
                                    }
                                })
                                }
                            selected={this.state.companySelected}
                            allowMultiple
                            />
                    </Card>
                </Modal.Section>
                </Modal>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    salesRepList: state.salesRepresentative.salesReps,
    companies: state.companyState.companies,
    store_hash: state.landingState.shopOrigin
})

export default connect(mapStateToProps, { getUsers, addSalesRep })(SalesRepList);


