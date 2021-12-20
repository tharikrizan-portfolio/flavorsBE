import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const OptionsModal = ({ onHide, questionNameTitle, children, show }) => {
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
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
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={onHide}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

OptionsModal.propTypes = {
  onHide: PropTypes.any,
  questionNameTitle: PropTypes.any,
};

export default OptionsModal;
