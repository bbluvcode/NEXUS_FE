import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Modal, Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { fetchCusRequests, changeStatusCusRequest } from '../../../redux/customer/cusRequestSlice';

const AssignSurveyorModal = ({ show, handleClose, requestId }) => {
    const dispatch = useDispatch()
    const [surveyorId, setSurveyorId] = useState('')
    const [empIdCreater, setEmpIdCreater] = useState(null)
    const [surveyors, setSurveyors] = useState([])

    useEffect(() => {
        const currentEmployee = JSON.parse(localStorage.getItem('currentEmployee'))
        if (currentEmployee?.id) {
            setEmpIdCreater(currentEmployee.id)
        } else {
            toast.error('Failed to retrieve logged-in employee ID!')
        }
    }, [show])

    useEffect(() => {
        if (requestId) {
            fetchSurveyors(requestId)
        }
    }, [requestId])

    const fetchSurveyors = async (requestId) => {
        try {
            const response = await axios.get(`http://localhost:5185/api/ServiceOrder/get-surveyors/${requestId}`);
            if (response.status === 200) {
                setSurveyors(response.data.data);
            } else {
                toast.error(response.data.message || 'Failed to fetch surveyors');
            }
        } catch (error) {
            console.error('API Error:', error);
            toast.error(error.response?.data?.message || 'Error fetching surveyors');
        }
    };

    const handleSubmit = async () => {    
        if (!surveyorId) {
            toast.error('Please select a Surveyor!');
            return;
        }
    
        try {
            const response = await axios.post(
                `http://localhost:5185/api/ServiceOrder/create-order-and-assign-survey/${requestId}`,
                {
                    SurveyorId: surveyorId,
                    EmpIDCreater: empIdCreater,
                }
            );
            if (response.status === 201) {
                toast.success('Surveyor assigned successfully!');
                const result = await dispatch(changeStatusCusRequest(requestId));
                await dispatch(fetchCusRequests());
                handleClose();
            }            
        } catch (error) {
            console.error('API Error:', error);
            toast.error(error.response?.data?.message || 'Error assigning surveyor');
        }
    };
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Order And Assign Surveyor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mt-3">
                        <Form.Label>Created by (EmpID)</Form.Label>
                        <Form.Control type="text" value={empIdCreater} readOnly />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Surveyor</Form.Label>
                        <Form.Control
                            as="select"
                            value={surveyorId}
                            onChange={(e) => setSurveyorId(e.target.value)}
                        >
                            <option value="">Select a Surveyor</option>
                            {surveyors.length > 0 ? (
                                surveyors.map((surveyor) => (
                                    <option key={surveyor.employeeId} value={surveyor.employeeId}>
                                        {surveyor.fullName}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No Surveyors Available</option>
                            )}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Confirm
                </Button>
            </Modal.Footer>
            <ToastContainer />
        </Modal>
    )
}

export default AssignSurveyorModal
