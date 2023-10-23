import React from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';

const ClaimStatus = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='text-primary fw-bold '>Claim Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Your query has been received. We are looking into it.</p>
        <ProgressBar  animated now={50} label={`${50}%`} />
      </Modal.Body>
    </Modal>
  );
};

export default ClaimStatus;
