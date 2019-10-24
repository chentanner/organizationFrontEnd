
import React, { useState, useEffect } from 'react';
import Layout from '../../src/hoc/Layout/Layout'

import { withRedux } from '../../src/hoc/withRedux/withRedux'
import JsonFormSsrWrapper from '../../src/components/JsonFormSsrWrapper/JsonFormSsrWrapper'
import schema from '../../src/schemas/organization/organizationSchema.json'
import uischema from '../../src/schemas/organization/organizationUiSchema.json'

const FormsIndexPage = (props) => {
    const [data, setData] = useState({});

    useEffect(() => {
        // Load initial data here
    }, [])

    return (
        <Layout>
            <h1> Approvals Overview Page: {props.appName}</h1>
            <p>This is a demo of the JsonForm package</p>
            <JsonFormSsrWrapper
                data={data}
                schema={schema}
                uischema={uischema}
            />
        </Layout>
    );
};

FormsIndexPage.getInitialProps = (props) => {
    const { isServer } = props.ctx

    return {
        isServer
    }
}

export default withRedux(FormsIndexPage);