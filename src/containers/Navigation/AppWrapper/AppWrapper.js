import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from '../../../components/Navigation/AppBar/AppBar';
import SideBar from '../../../components/Navigation/SideBar/SideBar';

import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import ListIcon from '@material-ui/icons/List';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import SettingsIcon from '@material-ui/icons/Settings';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
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
  },
}));

const AppWrapper = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  // TODO: this should defined and passed in from outside of the component.
  const drawerConfig = [
    [
      {
        id: 'home',
        name: 'Home',
        icon: HomeIcon
      },
      {
        id: 'organizations',
        name: 'Organization',
        icon: BusinessIcon
      },
      {
        id: 'counterpartyList',
        name: 'Counterparty List',
        icon: ListIcon
      }
    ],
    [
      {
        id: 'users',
        name: 'Users',
        icon: AssignmentTurnedInIcon
      },
      {
        id: 'formsDemo',
        name: 'Form Demo',
        icon: ThumbUpIcon
      },
      {
        id: 'configuration',
        name: 'Configuration',
        icon: SettingsIcon
      }
    ]
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar appName="Base App Title" open={open} onMenuClick={handleDrawerOpen} />
      <SideBar drawerConfig={drawerConfig} open={open} onDrawerClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

export default AppWrapper;