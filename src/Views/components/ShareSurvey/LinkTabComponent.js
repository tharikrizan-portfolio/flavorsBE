import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { IconButton } from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const LinkTabComponent = ({ isPublished, surveyLink }) => {
  return (
    <div>
      <Row style={{ display: 'flex' }}>
        <Col sm={11} style={{ paddingRight: '0px' }}>
          <SyntaxHighlighter language="javascript" style={{ ...ghcolors, borderRadius: '5px' }}>
            {isPublished ? surveyLink : `Please save to get Link`}
          </SyntaxHighlighter>
        </Col>
        <Col
          sm={1}
          style={{
            alignSelf: 'center',
            paddingLeft: '0px',
          }}
        >
          <CopyToClipboard text={surveyLink}>
            <IconButton
              color="secondary"
              onClick={() => {
                toast.info('Copied', {
                  position: 'top-right',
                });
              }}
            >
              <FileCopyIcon />
            </IconButton>
          </CopyToClipboard>
        </Col>
      </Row>

      <br />
    </div>
  );
};

LinkTabComponent.propTypes = {
  isPublished: PropTypes.bool.isRequired,
  surveyLink: PropTypes.string.isRequired,
};

export default LinkTabComponent;
