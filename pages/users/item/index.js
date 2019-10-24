import React from 'react';
import Layout from '../../../src/hoc/Layout/Layout';
import { withRouter } from 'next/router';

import ObjectManager from '../../../src/containers/ObjectManager/ObjectManager';
import { withRedux } from '../../../src/hoc/withRedux/withRedux'

import schema from '../../../src/schemas/organization/organizationSchema.json'
import uischema from '../../../src/schemas/organization/organizationUiSchema.json'

const config = {
    url: "users",
    sections: [
        {
            title: "title1",
            items: [
                {
                    id: "id",
                    label: "ID"
                },
                {
                    id: "avatar",
                    label: "Avatar",
                    type: "image"
                }
            ]
        },
        {
            title: "title2",
            items: [
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

const UserItemIndexPage = (props) => {
    let itemName = "";
    let selectedKey = null;
    if (props.router.query && props.router.query.id) {
        itemName = props.router.query.id;
        selectedKey = props.router.query.id;
    }

    return (
        <Layout>
            <h1> User: {itemName}</h1>
            <p>This is a demo of the item edit page</p>

            <ObjectManager
                title={"User Item: " + itemName}
                config={config}
                selectedKey={selectedKey}
                data={{}}
                schema={schema}
                uischema={uischema}
            />
        </Layout>
    );
};

UserItemIndexPage.getInitialProps = async function (props) {
    const { store, isServer } = props.ctx

    return { isServer }
};

export default withRouter(withRedux(UserItemIndexPage));