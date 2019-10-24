import React from 'react';
import Layout from '../../src/hoc/Layout/Layout';
import ObjectManagerTable from '../../src/containers/ObjectManagerTable/ObjectManagerTable';
import { Router } from '../../routes'
import { withRedux } from '../../src/hoc/withRedux/withRedux'


const tableConfig = {
    idProperty: "ID",
    nameProperty: "name",
    searchable: true,
    columns: [
        { title: 'Id', field: 'ID' },
        { title: 'Short Name', field: 'name' },
        { title: 'Legal Name', field: 'legalName' },
        { title: 'Created At', field: 'CreatedAt' },
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
                    id: "ID",
                    label: "ID"
                },
                {
                    id: "name",
                    label: "Name"
                },
                {
                    id: "CreatedAt",
                    label: "Created At",
                    type: "date"
                },
            ]
        }
    ]
};

const objectManagerTableConfig = {
    url: "organizations",
    tableConfig: tableConfig,
    summaryConfig: summaryConfig
}

const openItemHandler = (event, key) => {
    Router.pushRoute('/organizations/' + key);
}

const orgIndexPage = (props) => {
    // Should pass some config to the summaryTable
    return (
        <Layout>
            <h1> Organizations</h1>
            <ObjectManagerTable
                isRestful
                onItemOpen={(event, key) => openItemHandler(event, key)}
                config={objectManagerTableConfig}
            >
            </ObjectManagerTable>
        </Layout>
    );
};

orgIndexPage.getInitialProps = (props) => {
    const { isServer } = props.ctx

    return {
        isServer
    }
}

export default withRedux(orgIndexPage);