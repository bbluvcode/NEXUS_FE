import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStockRequests } from '../../../redux/stock/stockRequestSlice'
import BtnModal from '../../../components/button/BtnModal'

const StockRequestList = () => {
  const dispatch = useDispatch()
  const { items: stockRequests, status, error } = useSelector((state) => state.stockRequests)
  const [selectedStockRequest, setSelectedStockRequest] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStockRequests())
    }
  }, [dispatch, status])

  const toggleModal = (stockRequest = null) => {
    setSelectedStockRequest(stockRequest)
    setIsModalOpen(!isModalOpen)
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>Stock Request List</h2>
        <BtnModal
          name="Add New Stock Request"
          iform="StockRequestCreateForm"
          style="primary"
          onClick={() => toggleModal()}
        />
      </div>

      {isModalOpen && selectedStockRequest && (
        <BtnModal
          name="Edit Stock Request"
          iform="StockRequestEditForm"
          style="warning"
          stockRequest={selectedStockRequest}
          onClick={() => toggleModal()}
        />
      )}

      <div className="row">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Create Date</th>
              <th>Total Number</th>
              <th>Details</th>
              {/* <th>Actions</th> */}
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

            {status === 'succeeded' && stockRequests.length > 0 ? (
              stockRequests.map((items) => (
                <tr key={items.inStockRequestId}>
                  <td>{items.inStockRequestId}</td>
                  <td>
                    {items.employee
                      ? `${items.employee.firstName} ${items.employee.lastName}`
                      : `ID: ${items.employeeId}`}
                  </td>
                  <td>{new Date(items.createDate).toLocaleDateString()}</td>
                  <td>{items.totalNumber}</td>
                  <td>
                    {items.inStockRequestDetails?.length > 0 ? (
                      <ul>
                        {items.inStockRequestDetails.map((detail) => (
                          <li key={detail.inStockRequestDetailId}>
                            {detail.equipment
                              ? detail.equipment.equipmentName
                              : `Equipment ID: ${detail.equipmentId}`}{' '}
                            - Quantity: {detail.quantity}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      'No details'
                    )}
                  </td>
                  <td>
                    {/* <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="StockRequestEditForm"
                      style="warning"
                      onClick={() => toggleModal(items)}
                    /> */}
                  </td>
                </tr>
              ))
            ) : (
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
