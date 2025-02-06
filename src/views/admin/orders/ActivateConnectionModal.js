import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const ActivateConnectionModal = ({ show, handleClose, orderId, onActivate }) => {
  const [loading, setLoading] = useState(false);

  const handleActivate = async () => {
    if (!orderId) return;
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:5185/api/ServiceOrder/activate-connection/${orderId}`
      );

      if (response.status === 200) {
        toast.success("Connection activated successfully");
        onActivate(orderId);
        handleClose();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Activate Connection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to activate the connection for this order?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleActivate} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Activate"}
        </Button>
      </Modal.Footer>
      <ToastContainer/>
    </Modal>
  );
};

export default ActivateConnectionModal;
