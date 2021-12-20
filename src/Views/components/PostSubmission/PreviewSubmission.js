import PropTypes from "prop-types";
import React from "react";
import { Col } from "react-bootstrap";
import TextPreviewComponent from "../common/TextDtPreviewConverter/TextPreviewComponent";

const PreviewSubmission = ({
  descriptionHtml,
  postSubmissionScrBgColor,
  descriptionFontColor,
  isMultipleResponse,
}) => {
  return (
    <Col sm={12} style={{ padding: "0px" }}>
      <h5>Preview</h5>
      <hr />
      <div
        className="post-submission-tab-preview"
        style={{
          backgroundColor: postSubmissionScrBgColor,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {descriptionHtml && (
          <TextPreviewComponent
            color={descriptionFontColor}
            htmlValue={descriptionHtml}
            text="Thank you!"
            classes="post-submission-tab-preview-text"
          />
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {isMultipleResponse ? (
            <a style={{ color: descriptionFontColor }} href="">
              Submit another Response !
            </a>
          ) : null}
        </div>
      </div>
    </Col>
  );
};

PreviewSubmission.propTypes = {
  postSubmissionScrBgColor: PropTypes.string,
  descriptionFontColor: PropTypes.string,
  isMultipleResponse: PropTypes.bool,
};

export default PreviewSubmission;
