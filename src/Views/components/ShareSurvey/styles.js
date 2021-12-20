import reactCSS from "reactcss";

export const getStyles = (props) =>
  reactCSS({
    default: {
      colorSplashScrDescriptionFont: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: props.descriptionFontColor,
      },
      colorSplashScrButtonFont: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: props.buttonFontColor,
      },
      colorSplashScrBg: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: props.splashScrBgColor,
      },
      colorSplashScrButtonBg: {
        width: "36px",
        height: "14px",
        borderRadius: "2px",
        background: props.buttonBgColor,
      },

      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });
