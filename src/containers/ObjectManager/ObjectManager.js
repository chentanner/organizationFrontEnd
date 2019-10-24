import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ObjectItemForm from '../ObjectItemForm/ObjectItemForm'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Router, { withRouter } from 'next/router';

import BadgeSelect from '../../components/BadgedSelect/BadgedSelect'

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import * as objectManagerActions from '../../store/actions/index';
import axios from '../../axios-data';


import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CloseIcon from '@material-ui/icons/Close';
import DraftsIcon from '@material-ui/icons/Drafts';
import { ListItem } from '@material-ui/core';

import { strigifyCompareObjects } from '../../shared/utility'

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        "justify-content": "center"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: 120,
    },
    dense: {
        marginTop: 19,
    },
    formGroup: {
        padding: theme.spacing(1),
    },
    spacer: {
        "flex-grow": 1,
    },
    menu: {
        width: 200,
    },
    closeObjectButton: {
        flexGrow: 1,
        padding: theme.spacing(0),
    },
    closeIcon: {
        fontSize: theme.spacing(2),
    },
    backButton: {
        margin: theme.spacing(2, 0),
    },
    paper: {
        padding: theme.spacing(3),
        margin: theme.spacing(1),
    },
}));

const ObjectManager = props => {
    const classes = useStyles();
    console.log("rendering ObjectManager")

    let itemName = "";
    let selectedKey = null;
    if (props.router.query && props.router.query.organizationId) {
        itemName = props.router.query.organizationId;
        selectedKey = props.router.query.organizationId;
    }
    const [childFormUpdated, setChildFormUpdated] = useState(false);
    const [selectedItem, setSelectedItem] = useState(selectedKey);

    const checkIsDataLoaded = () => {
        const data = props.objectManagerState[props.config.objectName];
        if (!data || Object.keys(data).length === 0 || !data[selectedItem])
            return false;
        // !data || Object.keys(data).length === 0 || data[selectedItem].data[props.config.idProperty]+"" !== selectedItem)
        return true;
    }

    useEffect(() => {
        if (selectedItem && !checkIsDataLoaded()) {
            let url = props.config.url + "/" + selectedItem;
            console.log("Fetching data from object manager")
            props.fetchObjectManagerItem(props.config.objectName, selectedItem, url)
        }
    }, [selectedItem], props.objectManagerState[props.config.objectName])

    const handleSelectChange = (event) => {
        selectObject(event.target.value);
    }

    const selectObject = (itemValue) => {
        props.updateObjectManagerItemData(props.config.objectName, selectedItem, props.jsonFormData)
        setSelectedItem(itemValue);

        const urlPieces = props.router.asPath.split('/');
        urlPieces.pop();
        urlPieces.push(itemValue)
        const as = urlPieces.join('/')

        Router.push(
            props.router.pathname,
            as,
            { shallow: true }
        );
    }

    const closeObjectHandler = (event, itemKey) => {
        // check for pending edits.
        const currentItem = props.objectManagerState[props.config.objectName][itemKey].data;
        const originalItem = props.objectManagerState[props.config.objectName][itemKey].clone;

        if (!strigifyCompareObjects(currentItem, originalItem)) {
            // Has pending changes
            // alert("Has pending changes")
            return;
        }

        props.closeObjectManagerItem(props.config.objectName, itemKey)

        // Select first item in list if current selected item is closed
        if (itemKey === selectedItem) {
            let newItemToSelect = Object.keys(props.objectManagerState[props.config.objectName]).find((element) => {
                return element !== itemKey;
            });

            if (newItemToSelect)
                selectObject(newItemToSelect)
        }
    }

    const openItems = props.objectManagerState[props.config.objectName];
    let menuItems = []
    if (openItems !== undefined)
        menuItems = Object.keys(openItems).map((openItemKey, index) => {
            const openItem = openItems[openItemKey].data;
            const openItemName = openItem[props.config.nameProperty];
            const openItemValue = openItem[props.config.idProperty] + "";// Cast to string
            return (
                <ListItem
                    className={classes.menuItem}
                    key={openItemValue}
                    value={openItemValue}
                >
                    <ListItemText primary={openItemName || openItemValue /* If name isn't reliable, fall back to the identifier */} />
                    <ListItemSecondaryAction>
                        <IconButton
                            className={classes.closeObjectButton}
                            aria-label="close"
                            onClick={(event) => closeObjectHandler(event, openItemValue)}
                        >
                            <CloseIcon className={classes.closeIcon} />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });

    let selectedItemName = ""
    if (openItems && openItems[selectedItem])
        selectedItemName = openItems[selectedItem].data[props.config.nameProperty]
    const itemsDropdown = (
        <BadgeSelect
            selectedItem={selectedItem}
            selectedItemName={selectedItemName}
            selectChanged={handleSelectChange}
            inputLabel="Open Objects"
        >
            {menuItems}
        </BadgeSelect>
    )
    // };

    const onBackClick = () => {
        let urlPieces = props.router.asPath.split('?');
        if (urlPieces > 1)
            urlPieces.pop();
        urlPieces = props.router.asPath.split('/');
        urlPieces.pop();
        Router.push(urlPieces.join('/'));
    };

    let formData = {};
    if (props.objectManagerState[props.config.objectName] &&
        props.objectManagerState[props.config.objectName][selectedItem]) {
        formData = props.objectManagerState[props.config.objectName][selectedItem].data;
    }

    const onFormInitHandler = () => {
        setChildFormUpdated(true)
    }

    const onChange = (event) => {
        console.log("On change is called")
    }

    return (
        <div>
            <Box display="flex">
                <IconButton className={classes.backButton} onClick={onBackClick}>
                    <ChevronLeftIcon />
                </IconButton >
                <h1> {props.title}</h1>
                <div className={classes.spacer}
                />
                {itemsDropdown}
            </Box>
            <ObjectItemForm
                onInit={onFormInitHandler}
                config={props.config}
                selectedKey={selectedItem}
                data={formData}
                schema={props.schema}
                uischema={props.uischema}
                onChange={onChange}
            />

            <Paper className={classes.paper}>
                <Typography component="p">
                    {props.dataAsString}
                </Typography>
            </Paper>
        </div>
    );
};

ObjectManager.propTypes = {

};

const mapStateToProps = (state, ownProps) => {
    return {
        objectManagerState: {
            [ownProps.config.objectName]: state.objectManager[ownProps.config.objectName]
        },
        jsonFormData: { ...state.jsonforms.core.data },
        jsonFormCore: state.jsonforms.core,
        jsonForm: state.jsonforms,
        dataAsString: JSON.stringify(state.jsonforms.core.data),
        reduxState: state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initializeObjectManager: (objectManagerName) => dispatch(objectManagerActions.initObjectManager(objectManagerName)),
        fetchObjectManagerItem: (objectManagerName, key, url) => dispatch(objectManagerActions.fetchObjectManagerItem(objectManagerName, key, url)),
        addObjectManagerItem: (objectManagerName, key) => dispatch(objectManagerActions.addObjectManagerItem(objectManagerName, key)),
        closeObjectManagerItem: (objectManagerName, key) => dispatch(objectManagerActions.closeObjectManagerItem(objectManagerName, key)),
        setObjectManagerItemData: (objectManagerName, key, data) => dispatch(objectManagerActions.setObjectManagerItem(objectManagerName, key, data)),
        updateObjectManagerItemData: (objectManagerName, key, data) => dispatch(objectManagerActions.updateObjectManagerItem(objectManagerName, key, data)),
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ObjectManager));