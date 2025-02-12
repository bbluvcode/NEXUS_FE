/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeStatusCusRequest,
  fetchCusRequests,
  handleSetCusRequest,
} from '../../../redux/customer/cusRequestSlice'
import BtnModal from '../../../components/button/BtnModal'
import CIcon from '@coreui/icons-react'
import { cilCheck, cilUser, cilWarning } from '@coreui/icons'
import AssignSurveyorModal from '../../../components/modalbody/admin/AssignSurveyorModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ReactPaginate from 'react-paginate'

const CustomerRequest = () => {
  const dispatch = useDispatch()
  const customers = useSelector((state) => state.cusRequests.items)

  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedRequestId, setSelectedRequestId] = useState(null)
  
  const handleOpenAssignModal = (requestId) => {
    setSelectedRequestId(requestId)
    setShowAssignModal(true)
  }
  const handleChangeStatus = async (requestId, isResponse) => {
    if (!isResponse) {
      handleOpenAssignModal(requestId)
    } else {
      await dispatch(changeStatusCusRequest(requestId))
      await dispatch(fetchCusRequests())
    }
  }

  // State cho bộ lọc
  const [depositFilter, setDepositFilter] = useState("all") // 'all', 'pending', 'paid'
  const [isResponseFilter, setIsResponseFilter] = useState("all") // 'all', 'responded', 'notResponded'

  // Pagination
  const [filteredOrders, setFilteredOrders] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 8
  const pagesVisited = pageNumber * itemsPerPage
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage)
  const displayOrders = filteredOrders.slice(pagesVisited, pagesVisited + itemsPerPage)

  useEffect(() => {
    dispatch(fetchCusRequests())
  }, [dispatch])

  useEffect(() => {
    let filtered = customers

    // Lọc theo trạng thái đặt cọc (deposit)
    if (depositFilter === "pending") {
      filtered = filtered.filter((item) => item.depositStatus === "pending")
    } else if (depositFilter === "paid") {
      filtered = filtered.filter((item) => item.depositStatus !== "pending")
    }

    // Lọc theo phản hồi (isResponse)
    if (isResponseFilter === "responded") {
      filtered = filtered.filter((item) => item.isResponse)
    } else if (isResponseFilter === "notResponded") {
      filtered = filtered.filter((item) => !item.isResponse)
    }

    setFilteredOrders(filtered)
  }, [customers, depositFilter, isResponseFilter])

  const formatDateSystem = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Registered Plan List</h2>
        <AssignSurveyorModal
          show={showAssignModal}
          handleClose={() => setShowAssignModal(false)}
          requestId={selectedRequestId}
        />
        <div className="mb-3 d-flex gap-3">
          {/* Bộ lọc theo trạng thái đặt cọc */}
          <div>
            <label className="me-2">Deposit Status:</label>
            <select
              className="form-select w-auto d-inline-block"
              value={depositFilter}
              onChange={(e) => setDepositFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {/* Bộ lọc theo trạng thái phản hồi */}
          <div>
            <label className="me-2">Response Status:</label>
            <select
              className="form-select w-auto d-inline-block"
              value={isResponseFilter}
              onChange={(e) => setIsResponseFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="responded">Responded</option>
              <option value="notResponded">Not Responded</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Date Created</th>
              <th>Region Code</th>
              <th>Request Title</th>
              <th>ServiceRequest</th>
              <th>EquipmentRequest</th>
              <th>Deposit</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.length > 0 ? (
              displayOrders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDateSystem(item.dateCreate)}</td>
                  <td>{item.regionCode}</td>
                  <td>{item.requestTitle}</td>
                  <td>{item.serviceRequest}</td>
                  <td>{item.equipmentRequest}</td>
                  <td className={item.depositStatus === "pending" ? "text-danger" : ""}>
                    {item.depositStatus !== "pending" ? `$${item.deposit ?? 0}` : `-$${item.deposit ?? 0}`}
                  </td>
                  <td className="d-flex">
                    <button
                      className={`text-white me-1 btn btn-${item.isResponse ? "success" : "danger"}`}
                      onClick={() => handleChangeStatus(item.requestId, item.isResponse)}
                    >
                      <CIcon icon={item.isResponse ? cilCheck : cilWarning} />
                    </button>
                    <BtnModal name={<CIcon icon={cilUser} />} iform="CusReqDetail" style="outline-primary" />
                    <BtnModal name={<i className="fa fa-edit"></i>} iform="CusReqEditForm" style="outline-warning" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", color: "red" }}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center mt-3">
        <ReactPaginate
          previousLabel={<i className="fa fa-chevron-left"></i>}
          nextLabel={<i className="fa fa-chevron-right"></i>}
          pageCount={pageCount}
          onPageChange={({ selected }) => setPageNumber(selected)}
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
  )
}

export default React.memo(CustomerRequest)
