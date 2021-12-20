import React, { useState, useEffect } from "react";
import { convertDraftTrailWithGivenText } from "../../../../util/helper";

const TextPreviewComponent = ({ htmlValue, color, text, classes }) => {
  const htmlText = convertDraftTrailWithGivenText(htmlValue, text);
  return (
    <React.Fragment>
      <span
        className={classes || "configuration-tab-preview-desktop-text"}
        style={{
          color: color,
        }}
        dangerouslySetInnerHTML={{ __html: htmlText }}
      />
    </React.Fragment>
  );
};

export default TextPreviewComponent;
