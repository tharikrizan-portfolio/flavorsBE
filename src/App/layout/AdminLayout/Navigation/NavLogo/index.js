import React from 'react';
import { DEMO } from './../../../../../store/constant';
import Aux from '../../../../../hoc/_Aux';

const navLogo = (props) => {
  let toggleClass = ['mobile-menu'];
  if (props.collapseMenu) {
    toggleClass = [...toggleClass, 'on'];
  }

  return (
    <Aux>
      <div className="navbar-brand header-logo">
        <a href={DEMO.BLANK_LINK} className="b-brand">
          <div className="b-bg">
            <i className="feather icon-trending-up" />
          </div>
          <span className="b-title">
            <b>Bconic Survey</b>
          </span>
        </a>
        <a
          className={toggleClass.join(' ')}
          id="mobile-collapse"
          onClick={(e) => {e.preventDefault(); props.onToggleNavigation();}}
        >
          <span />
        </a>
      </div>
    </Aux>
  );
};

export default navLogo;
