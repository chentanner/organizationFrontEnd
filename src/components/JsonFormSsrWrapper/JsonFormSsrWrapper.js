import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux'
import Spinner from '../UI/Spinner/Spinner'
import { JsonFormsDispatch } from '@jsonforms/react';
import { Actions } from '@jsonforms/core';
import * as actions from '../../store/actions/index'
// This wrapper is used in conjunction with NextJS to avoid spamming useLayoutEffect if the JsonFormsDispatch component is rendered on the server.
// This wrapper will only load JsonFormsDispatch when useEffect is called which will be on the client.
const JsonFormSsrWrapper = props => {

    const [showChild, setShowChild] = useState(false);

    const dispatch = useDispatch()
    console.log("rendering JsonFormSsrWrapper")

    useEffect(() => {
        if (!(Object.entries(props.data).length === 0 && props.data.constructor === Object)) {
            props.initializeForm(props.data, props.schema, props.uischema, props.onInit)
            setShowChild(true);

        }
    }, [props.data, props.schema, props.uischema])

    return showChild ? <JsonFormsDispatch onChange={props.onChange} /> : <Spinner />;
};

const mapDispatchToProps = dispatch => {
    return {
        initializeForm: (data, schema, uischema, callback) => dispatch(actions.initJsonForm(data, schema, uischema, callback)),
    }
};

export default connect(null, mapDispatchToProps)(JsonFormSsrWrapper);