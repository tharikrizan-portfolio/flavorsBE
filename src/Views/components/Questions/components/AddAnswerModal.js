import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import ShadowScrollbar from "../../common/ShadowScrollBar/ShadowScrollBar";

const AddAnswerModal = ({ onHide, questionNameTitle, children, show }) => {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
      contentClassName="my-answer-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title
          align="center"
          id="contained-modal-title-vcenter"
          className="option-modal-popup-margin"
        >
          {questionNameTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ShadowScrollbar
          style={{
            height: "60vh",
          }}
          shadowColor="black"
          scrollColor="black"
        >
          {children}
        </ShadowScrollbar>
        <Modal.Footer>
          <Button variant="success" onClick={onHide}>
            Done
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

AddAnswerModal.propTypes = {
  onHide: PropTypes.any,
  questionNameTitle: PropTypes.any,
};

export default AddAnswerModal;
