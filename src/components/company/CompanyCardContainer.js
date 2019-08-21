import React from "react";
import { connect } from "react-redux";
import { addCompany, getCompanies, updateCompany } from '../../action/companyAction';
import CompanyCard from "./CompanyCard";
import {
    Modal,
    TextContainer,
    TextField,
    ChoiceList
} from '@shopify/polaris';

/* 
func: fetchCompanies()
func: addCompany()
func: handleChange()
func: cancelAddCompany()
func: displayAddCompany()
func: render()
*/
class CompanyCardContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showAddCompanyModal: false,
            newCompany: {
                name: "Please type in the name for the company",
                catalog: "what catalog does this company belong to",
                status: "1"
            }        
        }
        props.getCompanies(props.store_hash);
        this.populateCompanies = this.populateCompanies.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.toggleIsCompanyApproved = this.toggleIsCompanyApproved.bind(this);
        this.toggleAddCompanyModal = this.toggleAddCompanyModal.bind(this);
        this.addCompany = this.addCompany.bind(this);
    }

    addCompany(){
        console.log("Adding companies" + this.state.newCompany);
        this.props.addCompany(this.state.newCompany, "edwaleong-0");
        this.toggleAddCompanyModal();
    }


    handleChange(value, id){
        this.setState(
            prevState => {
                let newCompany = Object.assign({}, prevState.newCompany);
                if(id == 'Name') newCompany.name = value;
                else if(id == 'Catalog') newCompany.catalog = value;
                else {
                    newCompany.status = value;
                }
                return {newCompany};
            }
        );
    };

    toggleAddCompanyModal() {
        this.setState({
            showAddCompanyModal: !this.state.showAddCompanyModal
        })
    }

    handleTextChange(value, id){
        this.setState({
            newCompany: {
                ...this.state.newCompany,
                [id]: value
            }
        })
    }

    toggleIsCompanyApproved(){
        this.setState({
            newCompany: {
                ...this.state.newCompany,
                status:(this.state.newCompany.status === "1") ? '0' : '1'
            }
        })
    }


    populateCompanies(){
        var Companies = this.props.companies.map((company) => {
            if(typeof(company.data) === "string"){
                var data  = JSON.parse(company.data);
            }else{
                var data = company.data;
            }

            let array = Array();
            array['name'] = data.name;
            array['catalog'] = data.catalog;
            array['status'] = data.status;
            array['id'] = company.company_id;

            return (array);
        });
        return Companies;

    }

    render(){
        return(
            <div className="company-list">
                <div>
                    <button 
                    name = "addCompany"
                    onClick={this.toggleAddCompanyModal}>
                        Add a company
                    </button>
                </div>

                <Modal
                open={this.state.showAddCompanyModal}
                onClose = {this.toggleAddCompanyModal}
                title="Create A New Company"
                primaryAction={{
                    content: 'Add Company',
                    onAction: this.addCompany
                }}
                secondaryActions={[
                    {
                    content: 'Cancel',
                    onAction: this.toggleAddCompanyModal,
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
                        id = "name"
                        label = "Company Name"
                        value = {this.state.newCompany.name}
                        onChange = {this.handleTextChange} />
                    <TextField
                        id = "catalog"
                        label = "Company Catalog"
                        value = {this.state.newCompany.catalog}
                        onChange = {this.handleTextChange} />
                    <ChoiceList
                        id = "status"
                        title={'Company Status'}
                        choices={[
                            {label: 'Approved', value: '1'},
                            {label: 'Not Yet Approved', value: '0'},
                        ]}
                        selected={this.state.newCompany.status}
                        onChange={this.toggleIsCompanyApproved}
                        />
                </Modal.Section>
                </Modal>
                {
                    this.populateCompanies().map((company) => 
                        <CompanyCard  
                            key = {company.id}
                            name = {company.name}
                            catalog = {company.catalog}
                            status = {company.status} 
                            id = {company.id}
                        />
                    )
                }
            </div>
        );
    }
}


const mapStateToProps = state => ({
    company: state.companyState.company, 
    store_hash: state.landingState.shopOrigin,
    companies: state.companyState.companies
})

export default connect(mapStateToProps, { addCompany, getCompanies })(CompanyCardContainer);
