import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const drawerWidth = 600;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  paper: {
    padding: theme.spacing(0, 1),
  },
  buttonWrapper: {
    padding: theme.spacing(3),
    // height:"100%",
    // flexGrow: 1,
  },
  contentWrapper: {
    height: "100%",
    flexGrow: 1,
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const fabOnClick = (func, key) => {
  return func ? (event) => { func(event, key) } : null
};

export default function ObjectSummary(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.open,
        })}
      >
        {props.children}
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.contentWrapper}>
          <div className={classes.drawerHeader} />
          <div >
            <IconButton onClick={props.onSummaryClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          {props.content}
        </div>

        <div className={classes.buttonWrapper}>
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            onClick={fabOnClick(props.onAddItemClick, "draft")}
          >
            <AddIcon />
          </Fab>
          <Fab
            color="secondary"
            aria-label="edit"
            className={classes.fab}
            onClick={fabOnClick(props.onEditItemClick, props.selectedKey)}
          >
            <EditIcon />
          </Fab>
          <Fab
            disabled
            aria-label="delete"
            className={classes.fab}
            onClick={fabOnClick(props.onDeleteItemClick, props.selectedKey)}
          >
            <DeleteIcon />
          </Fab>
        </div>
      </Drawer>
    </div>
  );
};
