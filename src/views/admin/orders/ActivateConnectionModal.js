import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const ActivateConnectionModal = ({ show, handleClose, orderId, onActivate }) => {
  const [loading, setLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    if (show && orderId) {
      const fetchServiceOrderDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5185/api/ServiceOrder/details/${orderId}`);
          if (response.status === 200) {
            setCustomerInfo(response.data.customer);
          }
        } catch (error) {
          toast.error('Failed to fetch customer details');
          console.error(error);
        }
      };
      fetchServiceOrderDetails();
    }
  }, [show, orderId]);

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
        {customerInfo && (
          <div className="mb-3 p-3 border rounded bg-light">
            <h5 className='text-center'>Customer Information</h5>
            <p><strong>FullName:</strong> {customerInfo.fullName}</p>
            <p><strong>PhoneNumber:</strong> {customerInfo.phoneNumber}</p>
            <p><strong>InstallationAddress:</strong> {customerInfo.installationAddress}</p>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: customerInfo.isPay ? 'green' : '#e74c3c' }}>
              <strong>Status Payment:</strong> {customerInfo.isPay ? "Paid" : "Unpaid"}
            </p>
          </div>
        )}
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
      <ToastContainer />
    </Modal>
  );
};

export default ActivateConnectionModal;
