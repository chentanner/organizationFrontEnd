import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import AddIcon from '@material-ui/icons/Add';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  arrowDownIcon: {
    border: "solid rgba(0, 0, 0, 0.54)",
    "border-width": "0 3px 3px 0",
    display: "inline-block",
    padding: "2px",
    transform: " rotate(45deg)",
    position: "relative",
    top: "8px",
    left: "-5px",
  }
}));

export default function DynamicTabs(props) {

  const classes = useStyles();
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [tabs, setTabs] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addTab = (event, index) => {
    const newTabsState = [...tabs, { label: index }];
    setTabs(newTabsState);
    handleClose(event, index)
  }

  const buildTabs = (config, index) => {

    return <Tab key={index} label={config.label} {...a11yProps(index)} />
  }

  const builtTabs = tabs.map((item, index) => {

    return buildTabs(item, index);
  })

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event, index) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {builtTabs}
          <div>

            <IconButton
              ref={anchorRef}
              aria-controls="menu-list-grow"
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <AddIcon />
              <i className={classes.arrowDownIcon} />
            </IconButton>
          </div>
        </Tabs>
      </AppBar>

      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <MenuItem onClick={(event) => { addTab(event, "Company") }}>Company</MenuItem>
                  <MenuItem onClick={(event) => { addTab(event, "Counter Party") }}>Counter Party</MenuItem>
                  <MenuItem onClick={(event) => { addTab(event, "Bank") }}>Bank</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}