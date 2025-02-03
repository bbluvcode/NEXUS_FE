import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchStockRequests,
  changeStatusStockRequest,
  handleSetStockRequest,
} from '../../../redux/stock/stockRequestSlice.js'
import BtnModal from '../../../components/button/BtnModal'
import CIcon from '@coreui/icons-react'
import { cilCheck, cilStorage, cilWarning } from '@coreui/icons'

const StockRequest = () => {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector((state) => state.stockRequests)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStockRequests())
    }
  }, [dispatch, status])

  const formatDateSystem = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleEditStockReq = (stockReq) => {
    dispatch(handleSetStockRequest(stockReq))
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Stock Requests</h2>
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Employee Id</th>
              <th>Date Created</th>
              <th>Total Number</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item, index) => (
                <tr key={index}>
                  <td>{item.inStockRequestId}</td>
                  <td>{item.employeeId}</td>
                  <td>{formatDateSystem(item.createDate)}</td>
                  <td>{item.totalNumber}</td>
                  <td className="d-flex" onClick={() => handleEditStockReq(item)}>
                    <button
                      className={`text-white me-1 btn btn-${item.status ? 'success' : 'danger'}`}
                      onClick={() => {
                        dispatch(changeStatusStockRequest(item.inStockRequestId))
                      }}
                    >
                      <CIcon icon={item.status ? cilCheck : cilWarning} />
                    </button>

                    <BtnModal
                      name={<CIcon icon={cilStorage} />}
                      iform="StockReqDetail"
                      style="outline-primary"
                    />
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="StockReqEditForm"
                      style="outline-warning"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: 'red' }}>
                  No in-stock request data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default React.memo(StockRequest)
