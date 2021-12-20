import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../../../hoc/_Aux";
import { DEMO } from "../../../../store/constant";
import * as actionTypes from "../../../../actions/ui.actions";
import NavRight from "./NavRight";
import { withRouter } from "react-router-dom";

class NavBar extends Component {
  render() {
    let headerClass = [
      "navbar",
      "pcoded-header",
      "navbar-expand-lg",
      this.props.headerBackColor,
    ];
    if (this.props.headerFixedLayout) {
      headerClass = [...headerClass, "headerpos-fixed"];
    }

    let toggleClass = ["mobile-menu"];
    if (this.props.collapseMenu) {
      toggleClass = [...toggleClass, "on"];
    }

    return (
      <Aux>
        <header className={headerClass.join(" ")}>
          <div className="m-header">
            <a
              className={toggleClass.join(" ")}
              id="mobile-collapse1"
              onClick={(e) => {e.preventDefault(); this.props.onToggleNavigation();}}
            >
              <span />
            </a>
            <a href={DEMO.BLANK_LINK} className="b-brand">
              <div className="b-bg">
                <i className="feather icon-trending-up" />
              </div>
              <span className="b-title">Bconic Survey</span>
            </a>
          </div>
          <a className="mobile-menu" id="mobile-header" href={DEMO.BLANK_LINK}>
            <i className="feather icon-more-horizontal" />
          </a>
          <div className="collapse navbar-collapse">
            {/* <NavLeft/> */}
            {/* <NavRight rtlLayout={this.props.rtlLayout} /> */}
          </div>
        </header>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    rtlLayout: state.uiData.rtlLayout,
    headerBackColor: state.uiData.headerBackColor,
    headerFixedLayout: state.uiData.headerFixedLayout,
    collapseMenu: state.uiData.collapseMenu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleNavigation: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
