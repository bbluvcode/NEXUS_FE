/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import UpdateSurveyModal from './UpdateSurveyModal';
import AssignTechnicianModal from './AssignTechnicianModal';
import CompleteInstallationModal from './CompleteInstallationModal';
import ActivateConnectionModal from './ActivateConnectionModal';
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
          const sortedOrders = res.data.data.sort((a, b) => new Date(b.dateCreate) - new Date(a.dateCreate));
          setServiceOrders(sortedOrders);
          setFilteredOrders(sortedOrders);
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
        (order.surveyStatus && order.surveyStatus.toLowerCase().includes(value)) ||
        (order.dateCreate && formatDateSystem(order.dateCreate).toLowerCase().includes(value))
      );
      setFilteredOrders(filtered);
    }
  };

  const [selectedSurveyStatus, setSelectedSurveyStatus] = useState('');
  const [selectedOrderType, setSelectedOrderType] = useState('');

  const handleFilterChange = () => {
    let filtered = serviceOrders;

    if (selectedSurveyStatus) {
      filtered = filtered.filter(order => order.surveyStatus === selectedSurveyStatus);
    }

    if (selectedOrderType) {
      filtered = filtered.filter(order => order.orderId.startsWith(selectedOrderType));
    }
    filtered = filtered.sort((a, b) => new Date(b.dateCreate) - new Date(a.dateCreate));

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedSurveyStatus, selectedOrderType]);

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

  const fetchServiceOrders = () => {
    axios.get("http://localhost:5185/api/ServiceOrder")
      .then((res) => {
        if (res.status === 200) {
          const sortedOrders = res.data.data.sort((a, b) => new Date(b.dateCreate) - new Date(a.dateCreate));
          setServiceOrders(sortedOrders);
          setFilteredOrders(sortedOrders);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleTechnicianAssigned = (orderId, newStatus, installationId) => {
    fetchServiceOrders();
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

  const itemsPerPage = 6;
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>List of Service Orders</h2>
        <input
          type="text"
          placeholder="Search by Order ID, Survey Status, Date Created"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control w-50"
        />
      </div>

      {/* Bộ lọc */}
      <div className="d-flex gap-3 mb-3">
        <select
          className="form-select"
          value={selectedSurveyStatus}
          onChange={(e) => setSelectedSurveyStatus(e.target.value)}
        >
          <option value="">All Survey Status</option>
          <option value="Surveyor Assigned">Surveyor Assigned</option>
          <option value="Technician Assigned">Technician Assigned</option>
          <option value="Installation">Installation</option>
          <option value="Installation Completed">Installation Completed</option>
          <option value="Activated Connection">Activated Connection</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <select
          className="form-select"
          value={selectedOrderType}
          onChange={(e) => setSelectedOrderType(e.target.value)}
        >
          <option value="">All Order Types</option>
          <option value="T">Telephone</option>
          <option value="B">Broadband</option>
          <option value="D">Dial-up</option>
        </select>
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
                      disabled={order.surveyStatus === "Cancelled" || order.surveyStatus === "Installation" || order.surveyStatus === "Technician Assigned" || order.surveyStatus === "Installation Completed" || order.surveyStatus === "Activated Connection"}
                    >
                      Survey
                    </button>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleShowTechnicianModal(order.orderId)}
                      disabled={order.surveyStatus === "Cancelled" || order.surveyStatus === "Surveyor Assigned" || order.surveyStatus === "Technician Assigned" || order.surveyStatus === "Installation Completed" || order.surveyStatus === "Activated Connection"}
                    >
                      Technician
                    </button>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleShowCompleteInstallationModal(order.installationOrderId)}
                      disabled={order.surveyStatus === "Cancelled" || order.surveyStatus === "Surveyor Assigned" || order.surveyStatus === "Installation" || order.surveyStatus === "Installation Completed" || order.surveyStatus === "Activated Connection"}
                    >
                      Installated
                    </button>
                    <button
                      className="btn btn-info me-2"
                      onClick={() => handleShowActivateModal(order.orderId)}
                      disabled={order.surveyStatus === "Cancelled" || order.surveyStatus === "Surveyor Assigned" || order.surveyStatus === "Installation" || order.surveyStatus === "Activated Connection"}
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
