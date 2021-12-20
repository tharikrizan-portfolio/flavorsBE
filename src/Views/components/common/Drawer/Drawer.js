import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MaterialDrawer from '@material-ui/core/Drawer';

const Drawer = ({ children, anchor = 'right', isOpen, setIsOpen }) => {
  return (
    <>
      <MaterialDrawer anchor={anchor} open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="drawer-content">{children}</div>
      </MaterialDrawer>
    </>
  );
};

Drawer.propTypes = {
  children: PropTypes.any,
  anchor: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default Drawer;
