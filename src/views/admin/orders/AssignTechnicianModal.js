import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const AssignTechnicianModal = ({ show, handleClose, orderId, onTechnicianAssigned }) => {
  const [technicians, setTechnicians] = useState([]);
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (show) {
      const fetchServiceOrderDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5185/api/ServiceOrder/details/${orderId}`);
          if (response.status === 200) {
            setCustomerInfo(response.data.customer);
          }
        } catch (error) {
          setError('Failed to fetch customer details');
        }
      };
      fetchServiceOrderDetails();
    }
  }, [show, orderId]);

  useEffect(() => {
    if (orderId) {
      axios.get(`http://localhost:5185/api/ServiceOrder/get-technicals/${orderId}`)
        .then((res) => {
          if (res.status === 200) {
            setTechnicians(res.data.data);
          }
        })
        .catch((err) => {
          toast.error("Failed to fetch technicians");
          console.error(err);
        });
    }
  }, [orderId]);

  const handleAssign = () => {
    if (!selectedTechnician) {
      toast.error("Please select a technician");
      return;
    }

    setIsLoading(true);

    axios.post(`http://localhost:5185/api/ServiceOrder/assign-technician/${orderId}`, {
      technicianId: selectedTechnician,
    })
      .then((res) => {
        if (res.status === 200) {
          const installationOrderId = res.data.data.installationId;
          toast.success("Technician assigned successfully");
          onTechnicianAssigned(orderId, "Technician Assigned", installationOrderId);
          handleClose();
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Assign Technician</Modal.Title>
      </Modal.Header>
      {customerInfo && (
        <div className="mb-3 p-3 border rounded bg-light">
          <h5 className='text-center'>Customer Information</h5>
          <p><strong>FullName:</strong> {customerInfo.fullName}</p>
          <p><strong>PhoneNumber:</strong> {customerInfo.phoneNumber}</p>
          <p><strong>InstallationAddress:</strong> {customerInfo.installationAddress}</p>
        </div>
      )}
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select Technician</Form.Label>
            <Form.Select value={selectedTechnician} onChange={(e) => setSelectedTechnician(e.target.value)}>
              <option value="">-- Select Technician --</option>
              {technicians.map((tech) => (
                <option key={tech.employeeId} value={tech.employeeId}>
                  {tech.fullName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="success" onClick={handleAssign} disabled={isLoading}>
          {isLoading ? "Assigning..." : "Assign"}
        </Button>
      </Modal.Footer>
      <ToastContainer />
    </Modal>
  );
};

export default AssignTechnicianModal;
