import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Badge from '@material-ui/core/Badge';
import ListItemText from '@material-ui/core/ListItemText';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    itemSelector: {
        margin: theme.spacing(1),
        minWidth: 120,
        padding: theme.spacing(1),
    },
    select: {
        "min-width": "120px",
    },
    badge: {
        margin: theme.spacing(0, 2, 0, 0),
    },
}));

const BadgedSelect = props => {
    const classes = useStyles();

    const childCount = React.Children.count(props.children)

    // If selected item does exist
    let selectItems = props.children
    let selectedItem = props.selectedItem
    let selectedItemName = props.selectedItemName

    if (props.selectedItem === null) {
        // If no item is selected
        selectedItem = ""
        selectedItemName = ""
    } else {
        // If an item is selected check if it matches an entry in the children array
        let found = false;
        React.Children.forEach(props.children, function (child) {
            // This assumes values are always ints
            if (parseInt(child.props.value, 10) == parseInt(props.selectedItem, 10))
                found = true
        });
        if (!found) {
            console.log("Need to check if selected item exists in selectItems")
            selectedItem = ""
            selectedItemName = ""
        }
    }

    // If list is empty
    if (childCount === 0) {
        console.log("childCount === 0", childCount === 0)
        selectItems = <MenuItem value="__Empty__">No Open Objects</MenuItem>
        selectedItem = "__Empty__"
        selectedItemName = "No Open Objects"
    }

    const selectControl = (
        <Select
            className={classes.select}
            value={selectedItem}
            onChange={props.selectChanged}
            inputProps={{
                name: 'Open Objects',
                id: 'badged-select',
            }}
            renderValue={selected => (
                <ListItemText primary={selectedItemName} />
            )}
        >
            {selectItems}
        </Select>
    )

    const badgeControl = (
        <Badge
            className={classes.badge}
            overlap='rectangle'
            badgeContent={childCount}
            color="primary"
        >
            {selectControl}
        </Badge>
    )

    return (
        <FormControl className={classes.itemSelector}>
            <InputLabel htmlFor="badged-select">{props.inputLabel}</InputLabel>
            {badgeControl}
        </FormControl>
    );
};

BadgedSelect.propTypes = {

};

const memoPropsAreEqual = (prevProps, nextProps) => {
    return (prevProps.children.length === nextProps.children.length) &&
        (prevProps.selectedItem === nextProps.selectedItem) &&
        (prevProps.selectedItemName === nextProps.selectedItemName);
}

export default React.memo(BadgedSelect, memoPropsAreEqual);