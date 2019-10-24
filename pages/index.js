import React from 'react';
import Layout from '../src/hoc/Layout/Layout';
import { withRedux } from '../src/hoc/withRedux/withRedux'

const RootIndexPage = (props) => {
    return <Layout />
}

export default withRedux(RootIndexPage);