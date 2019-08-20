import React from "react";
import { connect } from "react-redux";
import { deleteCompany, updateCompany } from '../../action/companyAction';
import {
    Subheading,
    Badge,
    Card,
    Popover,
    ActionList,
    Button,
    List
} from '@shopify/polaris';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import '../../index.css';

class CompanyCard extends React.Component{

    constructor(props){
        super(props)
        console.log(props);
        this.state = {
            name: props.name,
            catalog: props.catalog,
            status: props.status,
            id: props.id,
            active: false
        }
        console.log(this.state);
        this.deleteCompany = deleteCompany.bind(this);
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
            <IconButton onClick={this.togglePopover.bind(this)}>
                <MoreVertIcon />
            </IconButton>
        );
        return (
            <div>
                <Popover
                active={this.state.active}
                activator={activator}
                onClose={() => this.togglePopover}
                >
                <ActionList
                    items={[
                    {
                        content: 'EDIT',
                        onAction: () => {
                            console.log(this.state.id);
                            return this.props.updateCompany('silk-jc', this.state.id, 
                            {
                                "name": "Please type in the name for the company",
                                "catalog": "what catalog does this company belong to",
                                "status": "Not Yet Approved"                            
                            });
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
            <Card
                title={this.state.name}
                actions = {[{content: this.renderMenu()}]}>
                <Card.Section>
                    <Subheading>
                        {this.state.name}
                    </Subheading>  
                    <p>{this.state.catalog}</p>
                    {
                        this.state.status == 0 &&
                        <Badge>Not approved</Badge>
                    }
                    {
                        this.state.status == 1 &&
                        <Badge status="success">Approved</Badge>                
                    }
                </Card.Section>
            </Card>

        );
    }
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { deleteCompany, updateCompany })(CompanyCard);
