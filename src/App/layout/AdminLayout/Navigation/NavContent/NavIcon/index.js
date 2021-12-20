import React from 'react';
import '../../../../../../menuItemsImages/dashboardMenuImage.css';

const navIcon = (props) => {
  let navIcons = false;
  if (props.items.icon) {
    navIcons = (
      <span>
        <img src={props.items.icon} className="menu-dashboard-image" />
      </span>
    );
  }
  return navIcons;
};

export default navIcon;
