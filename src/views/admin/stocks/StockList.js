import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStocks, handleSetStock } from '../../../redux/stock/stockSlice'
import BtnModal from '../../../components/button/BtnModal'
import StockCreateForm from '../../../components/modalbody/admin/StockCreateForm'
import StockEditForm from '../../../components/modalbody/admin/StockEditForm'

const StockList = () => {
  const dispatch = useDispatch()
  const { items: stocks, status, error } = useSelector((state) => state.stocks)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStock, setSelectedStock] = useState(null)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStocks())
    }
  }, [dispatch, status])

  const toggleModal = (stock = null) => {
    setSelectedStock(stock)
    setIsModalOpen(!isModalOpen)
  }

  const formatDateSystem = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>List of Stocks</h2>
        <BtnModal
          name="Create New Stock"
          iform="StockCreateForm"
          style="primary"
          onClick={() => toggleModal()}
        />
      </div>

      {isModalOpen &&
        (selectedStock ? (
          <StockEditForm stock={selectedStock} onSuccess={toggleModal} />
        ) : (
          <StockCreateForm onSuccess={toggleModal} />
        ))}

      <div className="row">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Stock Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Fax</th>
              <th>Region</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  Loading...
                </td>
              </tr>
            )}
            {status === 'failed' && (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', color: 'red' }}>
                  {error || 'Failed to load data.'}
                </td>
              </tr>
            )}
            {status === 'succeeded' && stocks.length > 0 ? (
              stocks.map((stock) => (
                <tr key={stock.stockId}>
                  <td>{stock.stockId}</td>
                  <td>{stock.stockName}</td>
                  <td>{stock.address}</td>
                  <td>{stock.email}</td>
                  <td>{stock.phone}</td>
                  <td>{stock.fax}</td>
                  <td>{stock.region?.regionName || 'Unknown'}</td>
                  <td>
                    <div className="btn-group">
                      <BtnModal
                        name={<i className="fa fa-edit"></i>}
                        iform="StockEditForm"
                        style="warning"
                        onClick={() => toggleModal(stock)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', color: 'red' }}>
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

export default StockList
