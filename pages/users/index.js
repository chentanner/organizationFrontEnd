import React from 'react';
import Layout from '../../src/hoc/Layout/Layout'
import ObjectManagerTable from '../../src/containers/ObjectManagerTable/ObjectManagerTable';
import { Router } from '../../routes'
import { withRedux } from '../../src/hoc/withRedux/withRedux'

const openItemHandler = (event, key) => {
    Router.pushRoute('/users/' + key);
}

const tableConfig = {
    idProperty: "id",
    nameProperty: "first_name",
    searchable: true,
    columns: [
        { title: 'Id', field: 'id' },
        { title: 'First Name', field: 'first_name' },
        { title: 'Last Name', field: 'last_name' },
    ]
};

const summaryConfig = {
    title: "",
    titleIdRef: "first_name",
    filtering: false,
    sections: [
        {
            items: [
                {
                    id: "id",
                    label: "ID"
                },
                {
                    id: "avatar",
                    label: "Avatar",
                    type: "image"
                },
                {
                    id: "first_name",
                    label: "First Name"
                },
                {
                    id: "last_name",
                    label: "Last Name"
                },
                {
                    id: "email",
                    label: "Email"
                }
            ]
        }
    ]
};

const objectManagerTableConfig = {
    url: "users",
    baseURL: "https://reqres.in/api/",
    tableConfig: tableConfig,
    summaryConfig: summaryConfig
}

const usersIndexPage = (props) => {
    return (
        <Layout>
            <div>
                <h1> Users Page: {props.appName}</h1>
                <p>This is a demo of the restful material-table</p>
                <ObjectManagerTable
                    isRestful
                    onItemOpen={(event, key) => openItemHandler(event, key)}
                    config={objectManagerTableConfig}
                >
                </ObjectManagerTable>
            </div>
        </Layout>
    );
};

export default withRedux(usersIndexPage);