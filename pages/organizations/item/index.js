import React, { useEffect, useState } from 'react';
import Layout from '../../../src/hoc/Layout/Layout';
import ObjectManager from '../../../src/containers/ObjectManager/ObjectManager';
import { withRedux } from '../../../src/hoc/withRedux/withRedux'
import { withRouter } from 'next/router';

import schema from '../../../src/schemas/organization/organizationSchema.json'
import uischema from '../../../src/schemas/organization/organizationUiSchema.json'

const config = {
    objectName: "organizations",
    url: "organizations",
    idProperty: "ID",
    nameProperty: "name",
    sections: [
        {
            title: "title1",
            type: "section",
            items: [
                {
                    id: "ID",
                    label: "ID"
                },
                {
                    id: "name",
                    label: "Short Name",
                    type: "image"
                }
            ]
        },
        {
            title: "title2",
            type: "section",
            items: [
                {
                    id: "legalName",
                    label: "Legal Name"
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
        },
        {
            title: "title1",
            type: "dynamicTabs",
            items: [
                {
                    title: "Company",
                    type: "section",
                    enabledBy: "companyRole",
                    items: [
                        {
                            id: "ID",
                            label: "ID"
                        },
                        {
                            id: "name",
                            label: "Short Name",
                            type: "image"
                        }
                    ]
                },
                {
                    title: "CounterParty",
                    type: "section",
                    enabledBy: "companyRole",
                    items: [
                        {
                            id: "ID",
                            label: "ID"
                        },
                        {
                            id: "name",
                            label: "Short Name",
                            type: "image"
                        }
                    ]
                },
                {
                    title: "Bank",
                    type: "section",
                    enabledBy: "companyRole",
                    items: [
                        {
                            id: "ID",
                            label: "ID"
                        },
                        {
                            id: "name",
                            label: "Short Name",
                            type: "image"
                        }
                    ]
                },
            ]
        },
    ]
};

const orgItemIndexPage = (props) => {
    const [data, setData] = useState({})
    let selectedKey = null;
    if (props.router.query && props.router.query.organizationId) {
        selectedKey = props.router.query.organizationId;
    }

    useEffect(() => {
        const loadedData = {
            "name": "John Doe",
            "vegetarian": false,
            "birthDate": "1985-06-02",
            "personalData": {
                "age": 34
            },
            "postalCode": "12345"
        }
        if (!data || Object.keys(data).length === 0) {
            setData(loadedData)
        }
    })

    return (
        <Layout>
            <ObjectManager
                title={"Organization"}
                objectManagerInstanceName="organizations"
                config={config}
                selectedKey={selectedKey}
                data={data}
                schema={schema}
                uischema={uischema}
            />
        </Layout>
    );
};

orgItemIndexPage.getInitialProps = (props) => {
    const { isServer } = props.ctx

    return { isServer }
}

export default withRouter(withRedux(orgItemIndexPage));