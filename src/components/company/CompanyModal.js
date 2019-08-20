import React, { Component } from 'react'
import {
    Modal,
    TextContainer,
    TextField,
    ChoiceList
} from '@shopify/polaris';
class CompanyModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            // isActive: props.selected,
            // newCompany: {
            //     name: "Please type in the name for the company",
            //     catalog: "what catalog does this company belong to",
            //     status: "Not Yet Approved"
            // }, 
            selected: ['hidden']
        }
    }

    render() {
        const {status} = this.props.newCompany;
        console.log(this.props)
        return (
            <div>
                <Modal
                open={this.props.isActive}
                // onClose={this.cancelAddCompany.bind(this)}
                title="Create New Company"
                primaryAction={{
                    content: 'Add Company',
                    // onAction: this.addCompany.bind(this),
                }}
                secondaryActions={[
                    {
                    content: 'Cancel',
                    // onAction: this.cancelAddCompany.bind(this),
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
                        value = {this.props.newCompany.name}
                        // onChange = {this.handleChange.bind(this)} 
                        />
                    <TextField
                        id = "Catalog"
                        label = "Company Catalog"
                        value = {this.props.newCompany.catalog}
                        // onChange = {this.handleChange.bind(this)} 
                        />
                    <ChoiceList
                        id = "Status"
                        title={'Company Status'}
                        choices={[
                            {label: 'Approved', value: '1'},
                            {label: 'Not Yet Approved', value: '0'},
                        ]}
                        selected={status}
                        // onChange={this.handleChange.bind(this)}
                        />
                </Modal.Section>
                </Modal>
            </div>
        )
    }
}

export default CompanyModal;

