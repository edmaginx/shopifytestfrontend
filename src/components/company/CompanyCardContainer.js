import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import {
    Modal,
    TextContainer,
    TextField
} from '@shopify/polaris';
import { addCompany } from '../../action/companyAction';
import CompanyCard from "./CompanyCard";

class CompanyCardContainer extends React.Component{
    constructor(){
        super()
        this.state = {
            companyList: [],
            active: false,
            newCompany: {
                name: "Please type in the name for the company",
                catalog: "what catalog does this company belong to",
                status: "Not Yet Approved"
            }, 
            companyCount: 0
        }
    }

    fetchCompanies(){
        // TODO: This will require an api endpoint for fetching all companies
    }

    addCompany(){
        this.props.addCompany(this.state.newCompany, "edwaleong-0");
    }

    removeCompany(){
        // TODO: Need delete request for company
        this.setState(prevState => ({
            companyList: this.state.companyList, 
            active: false, 
            companyCount: this.state.companyCount+1
        }));
    }

    handleChange(value, id){
        this.setState(
            prevState => {
                let newCompany = Object.assign({}, prevState.newCompany);
                if(id == 'Name') newCompany.name = value;
                else if(id == 'Catalog') newCompany.catalog = value;
                else if(id == 'Status') newCompany.status = value;
                return {newCompany};
            }
        );
    };

    cancelAddCompany() {
        this.setState({
            active: false,
        });
    }

    displayAddCompany() {
        this.setState({
            active: true,
        });
    }

    render(){
        return(
            <div>
                <button onClick={this.displayAddCompany.bind(this)}>
                    Add a company
                </button>
                {/* <button onClick={this.fetchCompanies()}>
                    Fetch companies
                </button> */}
                <Modal
                open={this.state.active}
                onClose={this.cancelAddCompany.bind(this)}
                title="Create New Company"
                primaryAction={{
                    content: 'Add Company',
                    onAction: this.addCompany.bind(this),
                }}
                secondaryActions={[
                    {
                    content: 'Cancel',
                    onAction: this.cancelAddCompany.bind(this),
                    },
                ]}
                >
                <Modal.Section>
                    <TextContainer>
                    <p>
                        Please type in the information for the new company
                    </p>
                    </TextContainer>
                    <TextField
                        id = "Name"
                        label = "Company Name"
                        value = {this.state.newCompany.name}
                        onChange = {this.handleChange.bind(this)} />
                    <TextField
                        id = "Catalog"
                        label = "Company Catalog"
                        value = {this.state.newCompany.catalog}
                        onChange = {this.handleChange.bind(this)} />
                    <TextField
                        id = "Status"
                        label = "Company Status"
                        value = {this.state.newCompany.status}
                        onChange = {this.handleChange.bind(this)} />
                </Modal.Section>
                </Modal>
            {
                this.state.companyList.map((company) => 
                    <CompanyCard  
                        key = {this.state.companyCount}
                        name = {company.name}
                        catalog = {company.catalog}
                        status = {company.status} 
                    />
                )
            }
            </div>

        );
    }
}


const mapStateToProps = state => ({
    company: state.companyState.company
})

export default connect(mapStateToProps, { addCompany })(CompanyCardContainer);
