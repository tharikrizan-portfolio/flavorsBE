import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ShadowScrollbar from '../common/ShadowScrollBar/ShadowScrollBar';
import { Toolbar } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    height: 'calc(100vh - 150px)',
  },
}));

export const TabView = ({ items, children }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className="flex-space-between" variant="dense">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {items.map((item, index) => (
              <Tab
                label={
                  <div className="flex">
                    <img src={item.imgSrc} style={{ height: '25px' }} className="mr-2" />
                    {item.title}
                  </div>
                }
              />
            ))}
          </Tabs>
          {children}
        </Toolbar>
      </AppBar>
      {items.map((item, index) => (
        <TabPanel className={classes.content} value={value} index={index}>
          <div className="tabview-scroll-area">{item.content}</div>
        </TabPanel>
      ))}
    </div>
  );
};

TabView.propTypes = {
  items: PropTypes.object,
};
