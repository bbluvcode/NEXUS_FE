import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const CompleteInstallationModal = ({ show, handleClose, installationId, onComplete }) => {
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

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
                onComplete(installationId);
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
                <Form>
                    <Form.Group controlId="formNotes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPaymentMethod" className="mt-3">
                        <Form.Label>Payment Method</Form.Label>
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
