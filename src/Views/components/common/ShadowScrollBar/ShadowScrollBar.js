import css from "dom-css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Scrollbars } from "react-custom-scrollbars";

class ShadowScrollbar extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      scrollTop: 0,
      scrollHeight: 0,
      clientHeight: 0,
      scrollColor: this.props.scrollColor,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
  }

  handleUpdate(values) {
    const { shadowTop, shadowBottom } = this.refs;
    const { scrollTop, scrollHeight, clientHeight } = values;
    const shadowTopOpacity = (1 / 20) * Math.min(scrollTop, 20);
    const bottomScrollTop = scrollHeight - clientHeight;
    const shadowBottomOpacity =
      (1 / 20) * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
    css(shadowTop, { opacity: shadowTopOpacity });
    css(shadowBottom, { opacity: shadowBottomOpacity });
  }

  renderThumb({ style, ...props }) {
    const { scrollTop, scrollColor } = this.state;

    const thumbStyle = {
      backgroundColor: scrollColor,
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  render() {
    const { style, ...props } = this.props;
    const containerStyle = {
      ...style,
      position: "relative",
    };
    const shadowTopStyle = {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 10,
      background: `linear-gradient(to bottom, ${this.props.shadowColor} 0%, rgba(0, 0, 0, 0) 100%)`,
    };
    const shadowBottomStyle = {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 10,
      background: `linear-gradient(to top, ${this.props.shadowColor} 0%, rgba(0, 0, 0, 0) 100%)`,
    };

    return (
      <div style={containerStyle}>
        <Scrollbars
          //   ref="scrollbars"
          renderThumbVertical={this.renderThumb}
          //   onUpdate={this.handleUpdate}
          {...props}
        />
        {/* <div ref="shadowTop" style={shadowTopStyle} />
        <div ref="shadowBottom" style={shadowBottomStyle} /> */}
      </div>
    );
  }
}

ShadowScrollbar.propTypes = {
  style: PropTypes.object,
};

export default ShadowScrollbar;
