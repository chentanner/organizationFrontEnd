import React, { useState, useEffect } from 'react';
import Layout from '../../src/hoc/Layout/Layout'
import { name } from "faker";
import InfiniteTable from '../../src/components/InfiniteTable/InfiniteTable';

const counterpartyListIndexPage = (props) => {
    const [state, setState] = React.useState({
        hasNextPage: true,
        isNextPageLoading: false,
        items: []
    });

    useEffect(() => {
        let isSubscribed = true
        setTimeout(() => {
            if (!isSubscribed) return;

            console.log("setTimeoutResolved");
            setState(prevState => ({
                hasNextPage: prevState.items.length < 100,
                isNextPageLoading: false,
                items: [...prevState.items].concat(
                    new Array(10).fill(true).map(() => ({ name: name.findName() }))
                )
            }));
        }, 2500);
        return () => isSubscribed = false;
    });

    const loadNextPage = (...args) => {
        console.log("loadNextPage", ...args);
        setState({ ...state, isNextPageLoading: true });
    };

    return (
        <Layout>
            <div>
                <h1> Counterparty List Page: {props.appName}</h1>
                <p>This is a demo of the an infinite scroll list</p>
                <InfiniteTable
                    hasNextPage={state.hasNextPage}
                    isNextPageLoading={state.isNextPageLoading}
                    items={state.items}
                    loadNextPage={loadNextPage}
                />
            </div>
        </Layout>
    );
};


export default counterpartyListIndexPage;