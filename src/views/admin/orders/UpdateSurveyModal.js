import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const UpdateSurveyModal = ({ show, handleClose, orderId, onSurveyUpdate }) => {
  const [surveyStatus, setSurveyStatus] = useState('');
  const [planFees, setPlanFees] = useState([]);
  const [selectedPlanFeeId, setSelectedPlanFeeId] = useState('');
  const [equipmentId, setEquipmentId] = useState('');
  const [numberOfConnections, setNumberOfConnections] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [equipments, setEquipments] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(null);

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
    if (show) {
      const fetchEquipments = async () => {
        try {
          const response = await axios.get('http://localhost:5185/api/ServiceOrder/get-equipment');
          if (response.status === 200) {
            setEquipments(response.data.data);
          }
        } catch (error) {
          setError('Failed to fetch Equipments');
        }
      };
      fetchEquipments();
    }
  }, [show]);

  useEffect(() => {
    if (show) {
      const fetchPlanFees = async () => {
        try {
          const response = await axios.get(`http://localhost:5185/api/ServiceOrder/get-planfees/${orderId}`);
          if (response.status === 200) {
            setPlanFees(response.data.data);
          }
        } catch (error) {
          setError('Failed to fetch Plan Fees');
        }
      };
      fetchPlanFees();
    }
  }, [show, orderId]);

  const validateForm = () => {
    if (!surveyStatus) {
      toast.error('Please select a survey status');
      return false;
    }
    if (surveyStatus === 'Invalid' && !cancellationReason) {
      toast.error('Please provide a cancellation reason');
      return false;
    }
    if (surveyStatus === 'Valid') {
      if (!selectedPlanFeeId) {
        toast.error('Please select a plan fee');
        return false;
      }
      if (!equipmentId) {
        toast.error('Please select an equipment');
        return false;
      }
      if (!numberOfConnections || isNaN(numberOfConnections) || numberOfConnections <= 0) {
        toast.error('Number of connections must be a valid number greater than 0');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const updatedStatus = surveyStatus === 'Valid' ? 'Installation' : 'Cancelled';

    const updateSurveyDto = {
      SurveyStatus: surveyStatus,
      PlanFeeId: selectedPlanFeeId || null,
      EquipmentId: equipmentId || null,
      NumberOfConnections: numberOfConnections ? Number(numberOfConnections) : null,
      CancellationReason: cancellationReason || null,
    };
    try {
      const response = await axios.put(`http://localhost:5185/api/ServiceOrder/update-survey/${orderId}`, updateSurveyDto);
      if (response.status === 200) {
        toast.success(response.data.message);
        onSurveyUpdate(orderId, updatedStatus);
        handleClose();
      }
    } catch (error) {
      setError('Failed to update survey status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Survey Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        {customerInfo && (
          <div className="mb-3 p-3 border rounded bg-light">
            <h5 className='text-center'>Customer Information</h5>
            <p><strong>FullName:</strong> {customerInfo.fullName}</p>
            <p><strong>PhoneNumber:</strong> {customerInfo.phoneNumber}</p>
            <p><strong>InstallationAddress:</strong> {customerInfo.installationAddress}</p>
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSurveyStatus" className='mb-2'>
            <Form.Label>Survey Status</Form.Label>
            <Form.Control as="select" value={surveyStatus} onChange={(e) => setSurveyStatus(e.target.value)}>
              <option value="">Select Status</option>
              <option value="Valid">Valid</option>
              <option value="Invalid">Invalid</option>
            </Form.Control>
          </Form.Group>

          {surveyStatus === 'Invalid' && (
            <Form.Group controlId="formCancellationReason">
              <Form.Label>Cancellation Reason</Form.Label>
              {['Out of Coverage Area', 'Technical Limitations', 'Service Unavailable', 'Plan Mismatch'].map((reason, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  label={reason}
                  name="cancellationReason"
                  value={reason}
                  checked={cancellationReason === reason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                />
              ))}
              <Form.Check
                type="radio"
                label="Other"
                name="cancellationReason"
                value="Other"
                checked={!['Out of Coverage Area', 'Technical Limitations', 'Service Unavailable', 'Plan Mismatch'].includes(cancellationReason)}
                onChange={() => setCancellationReason('')}
              />
              {cancellationReason === '' && (
                <Form.Control
                  type="text"
                  placeholder="Enter custom reason"
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                />
              )}
            </Form.Group>
          )}

          {surveyStatus === 'Valid' && (
            <>
              <Form.Group controlId="formPlanFeeId">
                <Form.Label>Plan Fee</Form.Label>
                <Form.Control as="select" value={selectedPlanFeeId} onChange={(e) => setSelectedPlanFeeId(e.target.value)}>
                  <option value="">Select Plan Fee</option>
                  {planFees.map((planFee) => (
                    <option key={planFee.planFeeId} value={planFee.planFeeId}>
                      {planFee.planFeeName} - {planFee.description}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formEquipmentId">
                <Form.Label>Equipment</Form.Label>
                <Form.Control as="select" value={equipmentId} onChange={(e) => setEquipmentId(e.target.value)}>
                  <option value="">Select Equipment</option>
                  {equipments.map((equipment) => (
                    <option key={equipment.equipmentId} value={equipment.equipmentId}>
                      {equipment.equipmentName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formNumberOfConnections">
                <Form.Label>Number of Connections</Form.Label>
                <Form.Control type="number" value={numberOfConnections} onChange={(e) => setNumberOfConnections(e.target.value)} />
              </Form.Group>
            </>
          )}
          <Button variant="primary" type="submit" disabled={loading} className='mt-2'>
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </Form>
      </Modal.Body>
      <ToastContainer />
    </Modal>
  );
};

export default UpdateSurveyModal;
