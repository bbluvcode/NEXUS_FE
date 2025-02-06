/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import UpdateSurveyModal from './UpdateSurveyModal';
import AssignTechnicianModal from './AssignTechnicianModal';
import CompleteInstallationModal from './CompleteInstallationModal';
import ActivateConnectionModal from './ActivateConnectionModal';
import { cilUser } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const ServiceOrder = () => {
  const [serviceOrders, setServiceOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [showTechnicianModal, setShowTechnicianModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedInstallationId, setSelectedInstallationId] = useState(null);
  const [showActivateModal, setShowActivateModal] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5185/api/ServiceOrder")
      .then((res) => {
        if (res.status === 200) {
          setServiceOrders(res.data.data);
          setFilteredOrders(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const formatDateSystem = (dateString) => {
    if (!dateString) return 'Waiting';
    return new Date(dateString).toLocaleDateString();
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      setFilteredOrders(serviceOrders);
    } else {
      const filtered = serviceOrders.filter(order =>
        order.orderId.toLowerCase().includes(value) ||
        (order.empIDSurveyor && order.empIDSurveyor.toString().includes(value))
      );
      setFilteredOrders(filtered);
    }
  };

  const handleSurveyUpdate = (orderId, newSurveyStatus) => {
    setServiceOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId ? { ...order, surveyStatus: newSurveyStatus } : order
      )
    );
    setFilteredOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId ? { ...order, surveyStatus: newSurveyStatus } : order
      )
    );
  };

  const handleTechnicianAssigned = (orderId, newStatus) => {
    setServiceOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId ? { ...order, surveyStatus: newStatus } : order
      )
    );
    setFilteredOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId ? { ...order, surveyStatus: newStatus } : order
      )
    );
  };

  const handleShowCompleteInstallationModal = (installationOrderId) => {
    setSelectedInstallationId(installationOrderId);
    setShowCompleteModal(true);
  };

  const handleCompleteInstallation = (installationId) => {
    setServiceOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.installationOrderId === installationId ? { ...order, surveyStatus: "Installation Completed" } : order
      )
    );
    setFilteredOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.installationOrderId === installationId ? { ...order, surveyStatus: "Installation Completed" } : order
      )
    );
  };

  const handleShowActivateModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowActivateModal(true);
  };

  const handleActivateConnection = (orderId) => {
    setServiceOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, surveyStatus: "Activated Connection" } : order
      )
    );
    setFilteredOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, surveyStatus: "Activated Connection" } : order
      )
    );
  };  

  const itemsPerPage = 10;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage);

  const displayOrders = filteredOrders.slice(pagesVisited, pagesVisited + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleShowSurveyModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowSurveyModal(true);
  };

  const handleShowTechnicianModal = (orderId) => {
    setSelectedOrderId(orderId);
    setShowTechnicianModal(true);
  };

  const handleCloseModals = () => {
    setShowSurveyModal(false);
    setShowTechnicianModal(false);
    setSelectedOrderId(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Service Orders</h2>
        <input
          type="text"
          placeholder="Search by Order ID or Surveyor ID"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control w-25 mb-3"
        />
      </div>
      <div className="row">
        <table className="table table-hover text-center align-middle">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date Created</th>
              <th>Deposit</th>
              <th>Surveyor ID</th>
              <th>Survey Status</th>
              <th>InstallationOrder</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.length > 0 ? (
              displayOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.orderId}</td>
                  <td>{formatDateSystem(order.dateCreate)}</td>
                  <td>${order.deposit ?? 0}</td>
                  <td>{order.empIDSurveyor ?? 'N/A'}</td>
                  <td>{order.surveyStatus ?? 'Waiting'}</td>
                  <td>{order.installationOrderId ?? "N/A"}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => handleShowSurveyModal(order.orderId)}
                      disabled={order.surveyStatus === "Cancelled" || order.surveyStatus === "Installation" || order.surveyStatus === "Technician Assigned" || order.surveyStatus === "Installation Completed"}
                    >
                      Survey
                    </button>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleShowTechnicianModal(order.orderId)}
                      disabled={order.surveyStatus === "Cancelled" || order.surveyStatus === "Surveyor Assigned" || order.surveyStatus === "Technician Assigned" || order.surveyStatus === "Installation Completed"}
                    >
                      Technician
                    </button>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleShowCompleteInstallationModal(order.installationOrderId)}
                      disabled={order.surveyStatus === "Cancelled" || order.surveyStatus === "Surveyor Assigned" || order.surveyStatus === "Installation" || order.surveyStatus === "Installation Completed"}
                    >
                      Installated
                    </button>
                    <button
                      className="btn btn-info me-2"
                      onClick={() => handleShowActivateModal(order.orderId)}
                      disabled={order.surveyStatus === "Cancelled" || order.surveyStatus === "Surveyor Assigned" || order.surveyStatus === "Installation"}
                    >
                      Activate
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>
                  No Service Order
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <UpdateSurveyModal
          show={showSurveyModal}
          handleClose={handleCloseModals}
          orderId={selectedOrderId}
          onSurveyUpdate={handleSurveyUpdate}
        />
        <AssignTechnicianModal
          show={showTechnicianModal}
          handleClose={handleCloseModals}
          orderId={selectedOrderId}
          onTechnicianAssigned={handleTechnicianAssigned}
        />
        <CompleteInstallationModal
          show={showCompleteModal}
          handleClose={() => setShowCompleteModal(false)}
          installationId={selectedInstallationId}
          onComplete={handleCompleteInstallation}
        />
        <ActivateConnectionModal
          show={showActivateModal}
          handleClose={() => setShowActivateModal(false)}
          orderId={selectedOrderId}
          onActivate={handleActivateConnection}
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <ReactPaginate
          previousLabel={<i className="fa fa-chevron-left"></i>}
          nextLabel={<i className="fa fa-chevron-right"></i>}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default React.memo(ServiceOrder);
