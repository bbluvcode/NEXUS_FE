import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStocks, setStock } from '../../../redux/stock/stockSlice'
import BtnModal from '../../../components/button/BtnModal'

const StockList = () => {
  const dispatch = useDispatch()
  const { items: stocks, error, loading } = useSelector((state) => state.stocks)

  useEffect(() => {
    dispatch(fetchStocks())
  }, [dispatch])

  const handleEditStock = useCallback(
    (stock) => {
      dispatch(setStock(stock))
    },
    [dispatch],
  )

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Stock</h2>
        <BtnModal name="Create New Stock" iform="StockCreateForm" style="primary" />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && stocks.length === 0 && (
        <p className="text-warning text-center">No stock available</p>
      )}

      {stocks.length > 0 && (
        <div className="row">
          <table className="table table-hover">
            <thead>
              <tr>
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
              {stocks.map((item) => (
                <tr key={item.stockId}>
                  <td>{item.stockName}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.fax}</td>
                  <td>{item.regionId}</td>
                  <td>
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="StockEditForm"
                      style="warning"
                      onClick={() => handleEditStock(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default React.memo(StockList)
