import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStockRequests, handleSetStockRequest } from '../../../redux/stock/stockRequestSlice'
import BtnModal from '../../../components/button/BtnModal'

const StockRequestList = () => {
  const dispatch = useDispatch()

  // Select stock request data from Redux store
  const stockRequests = useSelector((state) => state.stockRequests?.items || [])
  const status = useSelector((state) => state.stockRequests?.status)
  const error = useSelector((state) => state.stockRequests?.error)

  // Fetch stock requests when component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStockRequests())
    }
  }, [dispatch, status])

  const handleEditStockRequest = (stockRequest) => {
    dispatch(handleSetStockRequest(stockRequest))
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Stock Request List</h2>
        <BtnModal name="Add New Stock Request" iform="StockRequestCreateForm" style="primary" />
      </div>
      <div className="row">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Create Date</th>
              <th>Total Number</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  Loading...
                </td>
              </tr>
            )}
            {status === 'failed' && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'red' }}>
                  {error || 'Failed to load data.'}
                </td>
              </tr>
            )}
            {status === 'succeeded' && stockRequests.length > 0
              ? stockRequests.map((item) => (
                  <tr key={item.inStockRequestId}>
                    <td>{item.inStockRequestId}</td>
                    <td>
                      {item.employee
                        ? `${item.employee.firstName} ${item.employee.lastName}`
                        : `ID: ${item.employeeId}`}
                    </td>
                    <td>{new Date(item.createDate).toLocaleDateString()}</td>
                    <td>{item.totalNumber}</td>
                    <td>
                      {item.inStockRequestDetails?.length > 0 ? (
                        <ul>
                          {item.inStockRequestDetails.map((detail) => (
                            <li key={detail.inStockRequestDetailId}>
                              {detail.equipment?.equipmentName ||
                                `Equipment ID: ${detail.equipmentId}`}{' '}
                              - Quantity: {detail.quantity}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        'No details'
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEditStockRequest(item)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              : status === 'succeeded' && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', color: 'red' }}>
                      No data available
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default React.memo(StockRequestList)
