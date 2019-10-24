import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmIcon from '@material-ui/icons/Alarm';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const useStyles = makeStyles(theme => ({
    spacer: {
      flex: '1 1 100%',
    },
  }));

const TableToolbar = props => {
    const classes = useStyles();

    return (
        <Toolbar >
            <div className={classes.spacer} />
            <IconButton className={classes.button} aria-label="delete">
              <DeleteIcon />
            </IconButton>
            <IconButton className={classes.button} aria-label="delete" disabled color="primary">
              <DeleteIcon />
            </IconButton>
            <IconButton color="secondary" className={classes.button} aria-label="add an alarm">
              <AlarmIcon />
            </IconButton>
            <IconButton color="primary" className={classes.button} aria-label="add to shopping cart">
              <AddShoppingCartIcon />
            </IconButton>
          </Toolbar>
    );
};

TableToolbar.propTypes = {
    
};

export default TableToolbar;