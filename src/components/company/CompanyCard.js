import React from "react";
import { connect } from "react-redux";
import { deleteCompany, updateCompany } from '../../action/companyAction';
import {
    Subheading,
    Badge,
    Card,
    Popover,
    ActionList,
    Modal,
    TextContainer,
    TextField,
    ChoiceList
} from '@shopify/polaris';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import '../../index.css';
import CompanyModal from './CompanyModal';

class CompanyCard extends React.Component{

    constructor(props){
        super(props)
        console.log(props);
        this.state = {
            name: props.name,
            catalog: props.catalog,
            status: props.status,
            id: props.id,
            active: false,
            showModal: false,
            updateVal: {
                name: props.name,
                catalog: props.catalog,
                status: props.status,
            }
        }
        console.log(this.state);
        this.deleteCompany = deleteCompany.bind(this);
        this.togglePopover = this.togglePopover.bind(this);
        // this.updateCompany = updateCompany.bind(this);
    }

    handleClick(){

    }

    togglePopover(){
        this.setState(prevState => ({
            active: !prevState.active
        }));
    }

    
    renderMenu(){
        const activator = (
            <IconButton onClick={this.togglePopover}>
                <MoreVertIcon />
            </IconButton>
        );
        return (
            <div>
                <Popover
                active={this.state.active}
                activator={activator}
                onClose={this.togglePopover}
                >
                <ActionList
                    items={[
                    {
                        content: 'EDIT',
                        onAction: () => {
                            console.log(this.state.id);
                            return this.setState({showModal: true})
                        },
                    },
                    {
                        content: 'DELETE',
                        onAction: () => {
                            console.log(this.state.id);
                            return this.props.deleteCompany('silk-jc', this.state.id);
                        },
                    },
                    ]}
                />
                </Popover>

            </div>
        );
    }

    render(){        
        return(
            <div>
                <Card
                    title={this.props.name}
                    actions = {[{content: this.renderMenu()}]}>
                    <Card.Section>
                        <Subheading>
                            {this.props.name}
                        </Subheading>  
                        <p>{this.props.catalog}</p>
                        {
                            this.props.status == 0 &&
                            <Badge>Not approved</Badge>
                        }
                        {
                            this.props.status == 1 &&
                            <Badge status="success">Approved</Badge>                
                        }
                    </Card.Section>
                </Card>
                <Modal
                open={this.state.showModal}
                onClose={()=>this.setState({showModal: false})}
                title="Edit Company"
                primaryAction={{
                    content: 'Submit',
                    onAction: ()=>this.props.updateCompany(
                        this.props.store_hash,
                        this.props.id,
                        this.state.updateVal
                    )
                }}
                secondaryActions={[
                    {
                    content: 'Cancel',
                    onAction: () => {
                        this.setState({
                            showModal: false
                        })
                    },
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
                        value = {this.state.updateVal.name}
                        onChange = {(value) => {
                            this.setState({
                                updateVal: {
                                    ...this.state.updateVal,
                                    name: value
                                }
                            })
                        }}/>
                    <TextField
                        id = "Catalog"
                        label = "Company Catalog"
                        value = {this.state.updateVal.catalog}
                        onChange = {(value) => {
                            this.setState({
                                updateVal: {
                                    ...this.state.updateVal,
                                    catalog: value
                                }
                            })
                        }}/>
                    <ChoiceList
                        id = "Status"
                        title={'Company Status'}
                        choices={[
                            {label: 'Approved', value: '1'},
                            {label: 'Not Yet Approved', value: '0'},
                        ]}
                        selected={this.state.updateVal.status}
                        onChange = {(value) => {
                            this.setState({
                                updateVal: {
                                    ...this.state.updateVal,
                                    status: value
                                }
                            })
                        }}/>
                </Modal.Section>
                </Modal>
            </div>

        );
    }
}


const mapStateToProps = state => ({
    store_hash: state.landingState.shopOrigin
})

export default connect(mapStateToProps, { deleteCompany, updateCompany })(CompanyCard);
