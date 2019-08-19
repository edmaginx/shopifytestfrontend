import React from "react";
import { connect } from "react-redux";
import {
    Modal,
    TextContainer,
    TextField,
    ChoiceList
} from '@shopify/polaris';
import { addCompany, getCompanies } from '../../action/companyAction';
import CompanyCard from "./CompanyCard";
import { handleTextFieldChange, handletoggleChange } from '../../helper/helper';


/* 
func: fetchCompanies()
func: addCompany()
func: removeCompany()
func: handleChange()
func: cancelAddCompany()
func: displayAddCompany()
func: render()
*/
class CompanyCardContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            companyList: [],
            active: false,
            newCompany: {
                name: "Please type in the name for the company",
                catalog: "what catalog does this company belong to",
                status: "Not Yet Approved"
            }, 
            companyCount: 0,
            selected: ['hidden']
        }
        this.fetchCompanies = this.fetchCompanies.bind(this);
        this.fetchCompanies();
        this.populateCompanies = this.populateCompanies.bind(this);
        this.statusHandleChange = this.statusHandleChange.bind(this);
        this.handleTextFieldChange = handleTextFieldChange.bind(this);
        this.handletoggleChange = handletoggleChange.bind(this);
        this.toggleIsActive = this.toggleIsActive.bind(this);
    }

    statusHandleChange(value){
        this.setState({selected: value});
    }

    fetchCompanies(){
        var urlParams = new URLSearchParams(window.location.search);
        const store_hash = urlParams.get('shop').split(".")[0];  
        console.log("fetching companies");
        this.props.getCompanies(store_hash);
    }

    addCompany(){
        console.log("Adding companies" + this.state.newCompany);
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
                else {
                    newCompany.status = value;
                    this.statusHandleChange(value);
                }
                return {newCompany};
            }
        );
    };

    toggleIsActive() {
        this.handletoggleChange("active", this.state.active);
    }


    populateCompanies(){
        var Companies = this.props.companies.map((company) => {
            if(typeof(company.data) === "string"){
                var data  = JSON.parse(company.data);
            }else{
                var data = company.data;
            }

            let name = data.name;
            let catalog = data.catalog;
            let status = data.status;
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
        const {selected} = this.state;
        return(
            <div>
                <div>
                    <button 
                    name = "active"
                    value = {this.state.active}
                    onClick={this.toggleIsActive}>
                        Add a company
                    </button>
                </div>

                <Modal
                open={this.state.active}
                onClose = {this.toggleIsActive}
                title="Create New Company"
                primaryAction={{
                    content: 'Add Company',
                    onAction: this.toggleIsActive
                }}
                secondaryActions={[
                    {
                    content: 'Cancel',
                    onAction: this.toggleIsActive,
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
                        onChange = {this.handleTextFieldChange} />
                    <TextField
                        id = "Catalog"
                        label = "Company Catalog"
                        value = {this.state.newCompany.catalog}
                        onChange = {this.handleTextFieldChange} />
                    <ChoiceList
                        id = "Status"
                        title={'Company Status'}
                        choices={[
                            {label: 'Approved', value: '1'},
                            {label: 'Not Yet Approved', value: '0'},
                        ]}
                        selected={selected}
                        onChange={this.handleChange.bind(this)}
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
    shopOrigin: state.landingState.shopOrigin,
    companies: state.companyState.companies
})

export default connect(mapStateToProps, { addCompany, getCompanies })(CompanyCardContainer);
