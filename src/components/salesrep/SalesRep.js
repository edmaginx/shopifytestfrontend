import React from 'react';
import {
    Page,
    Card,
    DataTable
} from '@shopify/polaris';

class SalesRep extends React.Component{
    state = {
        sortedRows: null,
    };
    
    sortCurrency = (rows, index, direction) => {
    return [...rows].sort((rowA, rowB) => {
        const amountA = parseFloat(rowA[index].substring(1));
        const amountB = parseFloat(rowB[index].substring(1));

        return direction === 'descending' ? amountB - amountA : amountA - amountB;
    });
    };

    handleSort = (rows) => (index, direction) => {
    this.setState({sortedRows: this.sortCurrency(rows, index, direction)});
    };

    render() {
    const {sortedRows} = this.state;
    const initiallySortedRows = [
        ['Emerald Silk Gown', '$875.00', 124689],
        ['Mauve Cashmere Scarf', '$230.00', 124533],
        [
        'Navy Merino Wool Blazer with khaki chinos and yellow belt',
        '$445.00',
        124518
        ],
    ];
    const rows = sortedRows ? sortedRows : initiallySortedRows;

    return (
        <Page title="Overview">
        <Card>
            <DataTable
            columnContentTypes={[
                'text',
                'text',
                'text'
            ]}
            headings={[
                'Product',
                'Price',
                'SKU Number'
            ]}
            rows={rows}
            totals={['', '', '']}
            sortable={[false, true, false]}
            defaultSortDirection="descending"
            onSort={this.handleSort(rows)}
            />
        </Card>
        </Page>
    );
    }
}


export default SalesRep;
