import React from 'react';
import MaterialTable from 'material-table'

import baseAxios from '../../axios-data';
import axios from '../../axios-data';

const RestfulTable = props => {
    const [selectedRow, setSelectedRow] = React.useState(null);

    const idProperty = props.tableConfig.idProperty || "ID"

    function detailsButtonClick(event, row) {
        handleClick(event, row, true)
        if (props.onDetailButtonClick)
            props.onDetailButtonClick(event, row[idProperty])
    }

    function handleClick(event, row, fromDetailButton) {
        let newSelected = !selectedRow || selectedRow[idProperty] !== row[idProperty] ? row : null;
        if (fromDetailButton)
            // If the detail button was the source, just keep the row selected.
            newSelected = row;
        setSelectedRow(newSelected);
        if (props.onRowClick)
            props.onRowClick(event, row[idProperty])
    }

    const actions = [
        {
            icon: 'add',
            tooltip: 'Add New',
            isFreeAction: true,
            onClick: (event, rowData) => { props.onItemOpen(event, "draft") }
        },
        {
            icon: 'description',
            tooltip: 'Show Details',
            onClick: (event, rowData) => { detailsButtonClick(event, rowData) }
        }
    ];

    if (props.onItemOpen) {
        actions.push({
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData) => props.onItemOpen(event, rowData[idProperty])
        })
    }

    return (
        <div>
            <MaterialTable
                actions={actions}
                columns={props.tableConfig.columns || []}
                options={{
                    filtering: props.tableConfig.filtering || false,
                    search: props.tableConfig.searchable || true,
                    searchFieldAlignment: "left",
                    selection: false,
                    rowStyle: rowData => {
                        // Conditional will allow hover to work.
                        if (selectedRow && selectedRow[idProperty] === rowData[idProperty])
                            return { backgroundColor: '#DDD' }
                    }
                }}

                data={query => {
                    return new Promise((resolve, reject) => {
                        let url = props.url + "?"
                        url += 'per_page=' + query.pageSize
                        url += '&page=' + (query.page)
                        url += '&limit=' + (query.pageSize)
                        url += '&start=' + ((query.page) * query.pageSize)
                        const promise = props.urlBase ? baseAxios.get(props.urlBase + url) : axios.get(url)
                        promise
                            .then(result => {
                                if (props.urlBase) {
                                    resolve({
                                        data: result.data.data,
                                        page: result.data.page - 1,
                                        totalCount: result.data.total,
                                    });

                                } else {
                                    // Need to add some protection around this
                                    let page = Math.floor(result.data.start / result.data.limit)

                                    resolve({
                                        data: result.data.items,
                                        page: page,
                                        totalCount: result.data.count,
                                    });
                                }
                            })
                            .catch(error => {
                                reject(error);
                            })
                    })
                }
                }
                title={props.tableConfig.title || ""}
                onRowClick={(event, rowData) => { handleClick(event, rowData) }}
            />
        </div>
    );
};

export default RestfulTable;