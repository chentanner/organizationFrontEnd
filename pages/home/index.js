import React from 'react';
import Layout from '../../src/hoc/Layout/Layout'

const homeIndexPage = (props) => {
    return (
        <Layout>
            <div>
                <h1> Home Page: {props.appName}</h1>
            </div>
        </Layout>
    );
};

export default (homeIndexPage);