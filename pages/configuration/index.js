import React from 'react';
import Layout from '../../src/hoc/Layout/Layout'

const configurationIndexPage = (props) => {
    return (
        <Layout>
            <div>
                <h1> Configuration Page: {props.appName}</h1>
            </div>
        </Layout>
    );
};

export default configurationIndexPage;