import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Router from 'next/router';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const createList = (listSectionConfig, index) => {
  return (
    <List key={index}>
      {listSectionConfig.map((listConfigItem) => createListItem(listConfigItem))}
    </List>
  );
};

const createListItem = (config) => {
  const IconElement = config.icon;
  const routeNav = () => Router.push("/" + config.id);
  return (
    <ListItem button onClick={routeNav} key={config.id}>
      <ListItemIcon>
        <IconElement />
      </ListItemIcon>
      <ListItemText primary={config.name} />
    </ListItem>
  )
};

function SideBar(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className="sideBar">
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          }),
        }}
        open={props.open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={props.onDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        {props.drawerConfig.map((listSectionConfig, index) =>
          [
            (<Divider key={"divider_" + index} />),
            (createList(listSectionConfig, index))
          ]
        )}
      </Drawer>
    </div>
  );
}

export default SideBar;