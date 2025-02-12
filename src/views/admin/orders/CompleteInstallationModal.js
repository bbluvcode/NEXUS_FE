import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const CompleteInstallationModal = ({ show, handleClose, orderId, installationId, onComplete }) => {
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
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
    
    const handleCompleteInstallation = async () => {
        if (!installationId) {
            toast.error("Invalid installation ID");
            return;
        }
        setLoading(true);
        const finalNotes = paymentMethod
            ? `${notes}\nPayment Method: ${paymentMethod}`
            : notes;

        try {
            const response = await axios.put(
                `http://localhost:5185/api/ServiceOrder/complete-installation/${installationId}`,
                { notes: finalNotes }
            );

            if (response.status === 200) {
                toast.success("Installation completed successfully");
                onComplete(orderId, installationId);
                handleClose();
            }
        } catch (error) {
            toast.error("Failed to complete installation");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Complete Installation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {customerInfo && (
                    <div className="mb-3 p-3 border rounded bg-light">
                        <h5 className='text-center'>Customer Information</h5>
                        <p><strong>FullName:</strong> {customerInfo.fullName}</p>
                        <p><strong>PhoneNumber:</strong> {customerInfo.phoneNumber}</p>
                        <p><strong>Security Deposit: $</strong> {customerInfo.deposit}</p>
                        <p><strong>Total Due: $</strong> {customerInfo.total}</p>
                        <p style={{ fontSize: '1.5rem', color: '#e74c3c', fontWeight: 'bold' }}>
                            <strong>Outstanding Payment: $ {(customerInfo.total - customerInfo.deposit).toFixed(2)}</strong>
                        </p>
                    </div>
                )}
                <Form>
                    <Form.Group controlId="formPaymentMethod" className="mt-3">
                        <Form.Label>Confirm Payment Method</Form.Label>
                        <Form.Check
                            type="radio"
                            label="Cash"
                            name="paymentMethod"
                            value="Cash"
                            checked={paymentMethod === "Cash"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <Form.Check
                            type="radio"
                            label="Bank Transfer"
                            name="paymentMethod"
                            value="Bank Transfer"
                            checked={paymentMethod === "Bank Transfer"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formNotes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleCompleteInstallation} disabled={loading}>
                    {loading ? "Completing..." : "Complete"}
                </Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal>
    );
};

export default CompleteInstallationModal;
