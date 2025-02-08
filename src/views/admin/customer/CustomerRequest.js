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

  //pagination
  const [filteredOrders, setFilteredOrders] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 8
  const pagesVisited = pageNumber * itemsPerPage
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage)
  const displayOrders = filteredOrders.slice(pagesVisited, pagesVisited + itemsPerPage)
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected)
  }

  useEffect(() => {
    dispatch(fetchCusRequests())
  }, [dispatch])

  useEffect(() => {
    setFilteredOrders(customers)
  }, [customers])
  const formatDateSystem = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleEditCusReq = (cusReq) => {
    dispatch(handleSetCusRequest(cusReq))
  }

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

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Customer Request</h2>
      </div>
      <AssignSurveyorModal
        show={showAssignModal}
        handleClose={() => setShowAssignModal(false)}
        requestId={selectedRequestId}
      />
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date Created</th>
              <th>Region Code</th>
              <th>Request Title</th>
              <th>ServiceRequest</th>
              <th>EquipmentRequest</th>
              <th>Deposit</th>
              {/* <th>DateResolve</th> */}
              <th className="text-center">Action</th>
              {/* <th></th> */}
              {/* <th>Image</th>
              <th>Password</th> */}
            </tr>
          </thead>
          <tbody>
            {displayOrders.length > 0 ? (
              displayOrders.map((item, index) => (
                <tr key={index}>
                  <td>{item.requestId}</td>
                  <td>{formatDateSystem(item.dateCreate)}</td>
                  <td>{item.regionCode}</td>
                  <td>{item.requestTitle}</td>
                  <td>{item.serviceRequest}</td>
                  <td>{item.equipmentRequest}</td>
                  <td>${item.deposit ?? 0}</td>
                  {/* <td>{item.dateResolve ? formatDateSystem(item.dateResolve) : 'Waiting'}</td> */}
                  <td className="d-flex" onClick={() => handleEditCusReq(item)}>
                    <button
                      className={`text-white me-1 btn btn-${item.isResponse ? 'success' : 'danger'}`}
                      onClick={() => handleChangeStatus(item.requestId, item.isResponse)}
                    >
                      <CIcon icon={item.isResponse ? cilCheck : cilWarning} />
                    </button>
                    <BtnModal
                      name={<CIcon icon={cilUser} />}
                      iform="CusReqDetail"
                      style="outline-primary"
                    />
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="CusReqEditForm"
                      style="outline-warning"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr key={'1'}>
                  <td>TEST</td>
                  <td>TEST</td>
                  <td>TEST</td>
                  <td>{formatDateSystem(Date.now())}</td>
                  <td>TEST</td>
                  <td>TEST</td>

                  {/* <td>{item.image}</td>
        <td>{item.password}</td> */}
                  <td className="d-flex ">
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="CusReqDetail"
                      style="warning"
                    />
                    <BtnModal
                      name={<CIcon icon={cilUser} size="sm" />}
                      iform="CusReqEditForm"
                      style="primary"
                    />
                  </td>
                </tr>
                <tr key={'2'}>
                  <td colSpan="9" style={{ textAlign: 'center', color: 'red' }}>
                    Không truy cập được dữ liệu
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <ReactPaginate
          previousLabel={<i className="fa fa-chevron-left"></i>}
          nextLabel={<i className="fa fa-chevron-right"></i>}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={'pagination justify-content-center'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
        />
      </div>
      <ToastContainer />
    </div>
  )
}

export default React.memo(CustomerRequest)
