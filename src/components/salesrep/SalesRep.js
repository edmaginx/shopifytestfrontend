import React from 'react';
import { connect } from "react-redux";
import {
    Page,
    Card,
    DataTable,
    Modal,
    TextField,
    OptionList,
    ChoiceList
} from '@shopify/polaris';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { deleteUser, updateUser } from "../../action/salesRepAction";
// import { slideDown, slideUp } from './anim';

class SalesRep extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            salesRep: null,
            showEditSalesRepModal: false,
            companySelected: [],
            editRepInfo: null,
            displayRepInfo: null,
            expanded: false
        }
        this.populateRow = this.populateRow.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.toggleExpander = this.toggleExpander.bind(this);
    }

    render() {
        console.log(this.state.editRepInfo);
        return [
            <tr>
                <td>
                    <IconButton  onClick = {this.toggleExpander}>
                        {!this.state.expanded && <AddIcon />}
                        {this.state.expanded && <DeleteIcon />}
                    </IconButton>
                </td>
                <td>{ this.state.displayRepInfo.firstname + this.state.displayRepInfo.lastname}</td>
                <td>{ this.state.displayRepInfo.companyName }</td>
                <td>{ this.state.displayRepInfo.email }</td>
                <td>
                    <Button onClick={() => this.props.deleteUser(this.props.store_hash,this.props.salesRep.user_id)}>Delete</Button>
                    <Button onClick={() => this.toggleEditSalesRepModal(true)}>Edit</Button>
                    <Modal
                    open={this.state.showEditSalesRepModal}
                    onClose = {() => {
                        this.toggleEditSalesRepModal(false)
                        this.setState({
                            editRepInfo: {...this.state.displayRepInfo},
                            companySelected: this.props.salesRep.company_ids
                        })
                    }}
                    title="Edit"
                    primaryAction={{
                        content: 'Submit',
                        onAction: () => {
                            this.props.updateUser(
                                this.props.store_hash,
                                this.props.salesRep.user_id,
                                {
                                    company_ids: this.state.companySelected,
                                    role: this.props.salesRep.role,
                                    info: {
                                        firstname: this.state.editRepInfo.firstname,
                                        lastname: this.state.editRepInfo.lastname,
                                        email: this.state.editRepInfo.email
                                    }
                                }
                            );
                            this.toggleEditSalesRepModal(false);
                        }
                    }}
                    secondaryActions={[
                        {
                        content: 'Cancel',
                        onAction: () => {
                            this.toggleEditSalesRepModal(false)
                            this.setState ({
                                editRepInfo: {...this.state.displayRepInfo},
                                companySelected: this.props.salesRep.company_ids
                            })
                        },
                        },
                    ]}
                    >
                    <Modal.Section>
                        <TextField
                            id = "firstname"
                            label = "First Name"
                            value = { this.state.editRepInfo.firstname }
                            onChange = {this.handleTextChange} />
                        <TextField
                            id = "lastname"
                            label = "Last Name"
                            value = { this.state.editRepInfo.lastname }
                            onChange = {this.handleTextChange} />
                        <TextField
                            id = "email"
                            label = "Email"
                            value = { this.state.editRepInfo.email }
                            onChange = {this.handleTextChange} />
                        <Card>
                            <OptionList
                                title="Manage sales channels availability"
                                onChange={(value) => {
                                    console.log(value);
                                    this.setState({companySelected: value});
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
                </td>
            </tr>,
            this.state.expanded && (
              <tr>
                  <td>
                  </td>
                  <td></td>
                  <td>

                    { this.state.displayRepInfo.companyNameArr.map((name) => <tr><td>{name}</td></tr>) }

                  </td>
                  <td></td>
                  <td>

                  </td>
              </tr>)
        ]
    }

    static getDerivedStateFromProps(props, state){
        if(props.salesRep !== state.salesRep){

            console.log(props.salesRep);
            if(typeof(props.salesRep.data) === 'string'){
                var data = JSON.parse(props.salesRep.data);
            }else{
                var data = props.salesRep.data;
            }
            let firstname = data.firstname;
            let lastname = data.lastname;
            let email = data.email;
            let company = props.companies.filter((company) => {
                var idList = Array();
                for(let i = 0; i < props.salesRep.company_ids.length; i ++){
                    idList.push(props.salesRep.company_ids[i]);
                }
                return idList.includes(company.company_id);
            });
            // todo update companyname with actual company list, expandable

            var salesRepInfo = {};

            if (company.length>0){
              var companyNameArr = company.map((com) => JSON.parse(com.data).name);
              var companyName = companyNameArr[0];
              // var companyNameArr = companisJSON.
                //
                // var companyJSON = JSON.parse(company[0].data);
                // var companyNameArr = company.map((com) => JSON.parse(com))
            }else{
              var companyNameArr = [];
                var companyName = "Not assigned any company yet";
            }

            salesRepInfo.firstname = firstname;
            salesRepInfo.lastname = lastname;
            salesRepInfo.email = email;
            salesRepInfo.company = company
            salesRepInfo.companyName = companyName
            salesRepInfo.companyNameArr = companyNameArr;


            return {
                salesRep: props.salesRep,
                editRepInfo: salesRepInfo,
                // displayRepInfo: { ...salesRepInfo, companyName: companyName},
                displayRepInfo: salesRepInfo,
                companySelected: props.salesRep.company_ids
            }
        }
    }

    handleTextChange(value, id){
        this.setState({
            editRepInfo: {
                ...this.state.editRepInfo,
                [id]: value
            }
        })
    }

    toggleEditSalesRepModal(val){
        this.setState({
            showEditSalesRepModal: val
        })
    }

    populateRow(){
        console.log(this.props.salesRepEntity);
        if(typeof(this.props.salesRepEntity.data) === 'string'){
            var data = JSON.parse(this.props.salesRepEntity.data);
        }else{
            var data = this.props.salesRepEntity.data;
        }
        let name = `${data.firstname} ${data.lastname}`;
        let email = data.email;
        let company = this.props.companies.filter((company) => {
            var idList = Array();
            for(let i = 0; i < this.props.salesRepEntity.company_ids.length; i ++){
                idList.push(this.props.salesRepEntity.company_ids[i]);
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

    toggleExpander(){
      this.setState(
        { expanded: !this.state.expanded });
    }


}
const mapStateToProps = state => ({
    salesRepList: state.salesRepresentative.salesReps,
    companies: state.companyState.companies,
    store_hash: state.landingState.shopOrigin
})

export default connect(mapStateToProps, { deleteUser, updateUser })(SalesRep);
