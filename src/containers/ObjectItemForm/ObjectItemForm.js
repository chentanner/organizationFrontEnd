import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import JsonFormSsrWrapper from '../../components/JsonFormSsrWrapper/JsonFormSsrWrapper'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(3),
        margin: theme.spacing(1),
    },
}));

const ObjectItemForm = props => {
    const classes = useStyles();
    console.log("rendering ObjectItemForm")
    return (
        <Paper className={classes.paper}>
            <JsonFormSsrWrapper
                onInit={props.onInit}
                selectedKey={props.selectedKey}
                data={props.data}
                schema={props.schema}
                uischema={props.uischema}
                onChange={props.onChange}
            />
        </Paper>
    );
};

ObjectItemForm.propTypes = {

};

const memoPropsAreEqual = (prevProps, nextProps) => {
    // Quick short circuit so that {} === {} is seen as true
    let isDataEqual = false
    if (prevProps.data && nextProps.data)
        isDataEqual = Object.keys(prevProps.data).length === 0 && Object.keys(nextProps.data).length === 0
    if (!isDataEqual) {
        isDataEqual = prevProps.data === nextProps.data
    }

    const propsAreEqual = (
        isDataEqual &&
        prevProps.selectedKey === nextProps.selectedKey &&
        prevProps.schema === nextProps.schema &&
        prevProps.uischema === nextProps.uischema
    );

    // if(!propsAreEqual){
    //     console.log("ObjectItemForm should render", !propsAreEqual)
    //     if(!isDataEqual)
    //         console.log("isDataEqual is ",false)
    //     if(prevProps.selectedKey !== nextProps.selectedKey)
    //         console.log("selectedKey is ",false)
    //     if(prevProps.schema !== nextProps.schema)
    //         console.log("schema is ",false)
    //     if(prevProps.uischema !== nextProps.uischema)
    //         console.log("uischema is ",false)
    // }

    return propsAreEqual
}

export default React.memo(ObjectItemForm, memoPropsAreEqual);