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
  const [sortOrder, setSortOrder] = useState('desc') // Mặc định sắp xếp giảm dần

  // State cho tìm kiếm
  const [searchEmail, setSearchEmail] = useState('')
  const [filteredOrders, setFilteredOrders] = useState([])
  const [pageNumber, setPageNumber] = useState(0)

  const itemsPerPage = 8
  const pagesVisited = pageNumber * itemsPerPage
  const pageCount = Math.ceil(filteredOrders.length / itemsPerPage)
  const displayOrders = filteredOrders.slice(pagesVisited, pagesVisited + itemsPerPage)

  const handleSortByDateRequest = () => {
    const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc'
    setSortOrder(newSortOrder)

    const sortedRequests = [...filteredOrders].sort((a, b) => {
      return newSortOrder === 'desc'
        ? new Date(b.dateRequest) - new Date(a.dateRequest)
        : new Date(a.dateRequest) - new Date(b.dateRequest)
    })

    setFilteredOrders(sortedRequests)
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
    // const currentEmployee =
    dispatch(changeStatusSupportRequest({ supId, empIdResolver }))
  }

  // Hàm xử lý tìm kiếm theo email
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase()
    setSearchEmail(value)

    if (value === '') {
      setFilteredOrders(supportRequests) // Reset nếu không nhập gì
    } else {
      setFilteredOrders(supportRequests.filter((item) => item.email.toLowerCase().includes(value)))
    }
  }

  useEffect(() => {
    setFilteredOrders(supportRequests)
  }, [supportRequests])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h2>List of Support Request</h2>
        {/* Ô tìm kiếm email */}
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by email..."
          value={searchEmail}
          onChange={handleSearchChange}
        />
      </div>
      <div className="row mt-3">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>No.</th>
              {/* <th>Date Request</th> */}
              <th
                onClick={handleSortByDateRequest}
                style={{ cursor: 'pointer', width: '100px' }} // Đúng cú pháp
                className="d-flex justify-content-center"
              >
                Date Request {sortOrder === 'desc' ? '🔽' : '🔼'}
              </th>

              <th>Email</th>
              <th>Title</th>
              <th>Detail</th>
              <th>Resolver</th>
              <th>Date Resolve</th>
              <th className="text-center">Status</th>
              <th className="text-center">Response</th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.length > 0 ? (
              displayOrders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDateSystem(item.dateRequest)}</td>
                  <td className="text-center">{item.email}</td>
                  <td>{item.title}</td>
                  <td>{item.detailContent}</td>
                  <td>{item.empIdResolver ? 'EMP' + item.empIdResolver : ''}</td>
                  <td>{item.dateResolved ? formatDateSystem(item.dateResolved) : 'Waiting'}</td>
                  <td className="text-center">
                    <button
                      className={`text-white me-1 btn btn-${item.isResolved ? 'success' : 'danger'}`}
                      onClick={() => handleResolve(item.supportRequestId)}
                    >
                      <CIcon icon={item.isResolved ? cilCheck : cilWarning} />
                    </button>
                  </td>
                  <td
                    className="text-center"
                    onClick={() => {
                      dispatch(handleSetSuppportRequest(item))
                    }}
                  >
                    <BtnModal
                      name={<CIcon icon={cilInfo} size="sm" />}
                      iform="SupportResponseForm"
                      style="primary"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-danger">
                  No support requests found.
                </td>
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
