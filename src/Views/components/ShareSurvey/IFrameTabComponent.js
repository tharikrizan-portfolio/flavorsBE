import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import { DraftailEditor } from "draftail";
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { SketchPicker } from "react-color";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ghcolors } from "react-syntax-highlighter/dist/esm/styles/prism";
import PropTypes from "prop-types";

const inlineToolbarPlugin = createInlineToolbarPlugin();
const sideToolbarPlugin = createSideToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

const IFrameTabComponent = (parentProp) => {
  const fromParentState = parentProp.fromParentState;
  const styles = parentProp.styles;
  const allProps = parentProp.props;
  const commonEventHandler = parentProp.commonEventHandler;
  return (
    <div>
      <Row style={{ display: "flex" }}>
        <Col sm={11} style={{ paddingRight: "0px" }}>
          <SyntaxHighlighter language="javascript" style={ghcolors}>
            {allProps.iFrameText}
          </SyntaxHighlighter>
        </Col>
        <Col
          sm={1}
          style={{
            alignSelf: "center",
            paddingLeft: "0px",
          }}
        >
          <CopyToClipboard text={allProps.iFrameText}>
            <Button size="sm">
              <FaCopy />
            </Button>
          </CopyToClipboard>
        </Col>
      </Row>

      <div>
        <br />
      </div>

      <FormGroup>
        <Row>
          <Col sm={6}>
            <TextField
              id="standard-number"
              label="Width"
              type="number"
              value={allProps.iframeLength}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                allProps.changeIFrameLength(e.target.value);
              }}
              variant="outlined"
            />
          </Col>
          <Col sm={6}>
            <TextField
              id="standard-number"
              label="Height"
              type="number"
              value={allProps.iframeWidth}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                allProps.changeIFrameWidth(e.target.value);
              }}
              variant="outlined"
            />
          </Col>
        </Row>
        <br />
        <FormControlLabel
          control={
            <Switch
              checked={allProps.isSplashScreen}
              onChange={() => allProps.changeIsSplashScreen()}
            />
          }
          label="Enable Splash Screen"
        />
      </FormGroup>
      <br />
      {allProps.isSplashScreen ? (
        <div>
          <Row>
            <Col sm={8}>
              <Card>
                <Card.Header>Configure Splash Screen</Card.Header>
                <div className="row">
                  <div className="col-6">
                    <DraftailEditor
                      editorfromParentState={
                        fromParentState?.splash_screen?.description || ""
                      }
                      onChange={allProps.onChangeDescription}
                      placeholder="Description..."
                      plugins={plugins}
                    />
                    <InlineToolbar />
                    <SideToolbar />
                  </div>
                  <div className="col-6">
                    <TextField
                      id="standard-basic"
                      label="Button Text"
                      value={allProps.buttonText}
                      onChange={(e) =>
                        allProps.changeSplashScrButtonText(e.target.value)
                      }
                    />
                  </div>
                </div>

                <br />
                <div className="col">
                  <br />
                  <div className="row">
                    <div className="col-6">
                      <span>
                        <strong>Button text Color</strong>
                      </span>
                    </div>
                    <div className="col-6">
                      <div>
                        <div
                          style={styles.swatch}
                          onClick={
                            commonEventHandler.handleClickSplashScrButtonFontPicker
                          }
                        >
                          <div style={styles.colorSplashScrButtonFont} />
                        </div>
                        {fromParentState.displayColorPickerSplashScrButtonFontColor ? (
                          <div style={styles.popover}>
                            <div
                              style={styles.cover}
                              onClick={
                                commonEventHandler.handleCloseSplashScrButtonFontPicker
                              }
                            />
                            <SketchPicker
                              color={allProps.buttonBgColor}
                              onChangeComplete={(e) =>
                                allProps.changeSplashScrButtonFontColor(e.hex)
                              }
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="row">
                    <div className="col-6">
                      <span>
                        <strong>Button Color</strong>
                      </span>
                    </div>
                    <div className="col-6">
                      <div>
                        <div
                          style={styles.swatch}
                          onClick={
                            commonEventHandler.handleClickSplashScrButtonBgPicker
                          }
                        >
                          <div style={styles.colorSplashScrButtonBg} />
                        </div>
                        {fromParentState.displayColorPickerSplashScrButtonBgColor ? (
                          <div style={styles.popover}>
                            <div
                              style={styles.cover}
                              onClick={
                                commonEventHandler.handleCloseSplashScrButtonBgPicker
                              }
                            />
                            <SketchPicker
                              color={allProps.buttonBgColor}
                              onChangeComplete={(e) =>
                                allProps.changeSplashScrButtonBgColor(e.hex)
                              }
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </Card>
            </Col>
            <Col sm={4}>
              <h5> Your Splash Screen! </h5>
              <hr />

              <Card
                style={{
                  backgroundColor: allProps.splashScrBgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "170px",
                }}
              >
                <div
                  style={{
                    color: allProps.descriptionFontColor,
                    paddingBottom: "5px",
                  }}
                >
                  Splash Screen Description
                </div>

                <div className="initial-screen-continue-button-div">
                  <button
                    class="ui button next-previous-button"
                    style={{
                      backgroundColor: allProps.buttonBgColor,
                      color: allProps.buttonFontColor,
                    }}
                  >
                    Continue
                  </button>
                </div>
              </Card>
              <Button onClick={allProps.resetSplashScrConfig}>Reset</Button>
            </Col>
          </Row>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

IFrameTabComponent.propTypes = {
  fromParentState: PropTypes.object.isRequired,
};

export default IFrameTabComponent;
