import React, { memo } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";

const BootstrapModal = ({ show, message, onHide, size = "sm", children }) => {
  return (
    <Modal
      size={size}
      show={show}
      onHide={() => onHide()}
      aria-labelledby="example-modal-sizes-title-sm"
      style={{ color: "black" }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          <b style={{ textAlign: "center" }}>{message}</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

BootstrapModal.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  onHide: PropTypes.func,
  size: PropTypes.string,
  children: PropTypes.any,
};

export default memo(BootstrapModal);
