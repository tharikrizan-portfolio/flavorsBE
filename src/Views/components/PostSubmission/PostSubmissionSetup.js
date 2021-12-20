import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import "draft-js/dist/Draft.css";
import { DraftailEditor } from "draftail";
import "draftail/dist/draftail.css";
import PropTypes from "prop-types";
import React from "react";
import { Card, Col } from "react-bootstrap";
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;
const plugins = [inlineToolbarPlugin, sideToolbarPlugin];

const PostSubmissionSetup = ({
  description,
  onChangeDescription,
  isMultipleResponse,
  changePostSurveyMultipleResponse,
}) => {
  return (
    <Col sm={9}>
      <h5>Setup </h5>
      <hr />
      <Card style={{ zIndex: 100 }}>
        <DraftailEditor
          editorState={description}
          onChange={onChangeDescription}
          placeholder="Description..."
          plugins={plugins}
        />
        <InlineToolbar />
        <SideToolbar />
      </Card>
      <br />
      <Card>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isMultipleResponse}
                onChange={() => changePostSurveyMultipleResponse()}
              />
            }
            label="Enable Multiple Response"
          />
        </FormGroup>
      </Card>
    </Col>
  );
};

PostSubmissionSetup.propTypes = {
  description: PropTypes.string,
  onChangeDescription: PropTypes.func,
  isMultipleResponse: PropTypes.bool,
  changePostSurveyMultipleResponse: PropTypes.func,
};

export default PostSubmissionSetup;
