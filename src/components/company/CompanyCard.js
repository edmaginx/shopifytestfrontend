import React from "react";
import {
    Subheading,
    Badge,
    Card,
    Popover,
    ActionList,
    Button
} from '@shopify/polaris';

import '../../index.css';

class CompanyCard extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            name: props.name,
            catalog: props.catalog,
            status: props.status,
            active: false
        }
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
            <Button onClick={this.togglePopover.bind(this)}>More actions</Button>
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
                        content: 'Import file',
                        onAction: () => {
                        console.log('File imported');
                        },
                    },
                    {
                        content: 'Export file',
                        onAction: () => {
                        console.log('File exported');
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
                <Card.Section>
                    <Subheading>{this.state.name}</Subheading>  
                    <p>{this.state.catalog}</p>
                    {
                        this.state.status == 0 &&
                        <Badge>Not approved</Badge>
                    }
                    {
                        this.state.status == 1 &&
                        <Badge status="success">Approved</Badge>                
                    }
                    {this.renderMenu()}
                </Card.Section>
            </div>
        );
    }
}

export default CompanyCard;
