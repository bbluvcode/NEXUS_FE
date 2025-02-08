/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeStatusSupportRequest,
  fetchSuppportRequests,
  handleSetSuppportRequest,
} from '../../../redux/customer/supportRequestSlice'
import BtnModal from '../../../components/button/BtnModal'
import CIcon from '@coreui/icons-react'
import { cilCheck, cilInfo, cilUser, cilWarning } from '@coreui/icons'
import ReactPaginate from 'react-paginate'

const SupportRequest = () => {
  const dispatch = useDispatch()
  const supportRequests = useSelector((state) => state.supportRequests.items)
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
    dispatch(fetchSuppportRequests())
  }, [dispatch])

  useEffect(() => {
    setFilteredOrders(supportRequests)
  }, [supportRequests])

  const formatDateSystem = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleResolve = (supId) => {
    const empIdResolver = 1
    dispatch(changeStatusSupportRequest({ supId, empIdResolver }))
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Support Request</h2>
        {/* <BtnModal name="Create New Support Request" iform="SupReqCreateForm" style="primary" /> */}
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date Request</th>
              <th>Email</th>
              <th>Title</th>
              <th>Detail</th>
              <th>Resolver</th>
              <th>Date Resolve</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {supportRequests.length > 0 ? (
              supportRequests.map((item, index) => (
                <tr key={index}>
                  <td>{item.supportRequestId}</td>
                  <td>{formatDateSystem(item.dateRequest)}</td>
                  <td className="text-center">{item.email}</td>
                  <td>{item.title}</td>
                  <td>{item.detailContent}</td>
                  <td>{item.empIdResolver ? 'EMP' + item.empIdResolver : ''}</td>
                  <td>{item.dateResolved ? formatDateSystem(item.dateResolved) : 'Waiting'}</td>
                  <td className="d-flex" onClick={()=>{
                    dispatch(handleSetSuppportRequest(item))
                  }}>
                    <button
                      className={`text-white me-1 btn btn-${item.isResolved ? 'success' : 'danger'}`}
                      onClick={() => handleResolve(item.supportRequestId)}
                    >
                      <CIcon icon={item.isResolved ? cilCheck : cilWarning} />
                    </button>
                      <BtnModal
                        name={<CIcon icon={cilInfo} size="sm" />}
                        iform="SupportResponseForm"
                        style="primary"
                      />
                    {/* <BtnModal name={<CIcon icon={cilUser} />} iform="SupReqEditForm" style="outline-primary" />
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="6"
                      style="outline-warning"
                    /> */}
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
                  <td className="d-flex ">
                    <BtnModal name={<CIcon icon={cilUser} size="sm" />} iform="SupportResponseForm" style="primary" />
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
    </div>
  )
}

export default SupportRequest
