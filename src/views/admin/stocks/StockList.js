/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStocks, handleSetStock } from '../../../redux/stock/stockSlice'
import BtnModal from '../../../components/button/BtnModal'

const StockList = () => {
  const dispatch = useDispatch()
  const stocks = useSelector((state) => state.stocks.items)

  useEffect(() => {
    dispatch(fetchStocks())
  }, [dispatch])

  const handleEditStock = (stock) => {
    dispatch(handleSetStock(stock))
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Stock</h2>
        <BtnModal name="Create New Stock" iform="StockCreateForm" style="primary" />
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Stock Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Fax</th>
              <th>Region</th>
              {/* <th></th> */}
            </tr>
          </thead>
          <tbody>
            {stocks.length > 0 ? (
              stocks.map((item, index) => (
                <tr key={index}>
                  {/* <td>{item.stockId}</td> */}
                  <td>{item.stockName}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.fax}</td>
                  <td>{item.regionId }</td>
                  <td onClick={() => handleEditStock(item)}>
                    {/* <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="StockEditForm"
                      style="warning"
                      stock={item}
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
                  <td>TEST</td>
                  <td>TEST</td>
                  <td>TEST</td>
                  <td>TEST</td>
                  <td>
                    <BtnModal name={<i className="fa fa-edit"></i>} iform="StockEditForm" style="warning" />
                  </td>
                </tr>
                <tr key={'2'}>
                  <td colSpan="8" style={{ textAlign: 'center', color: 'red' }}>
                    Không truy cập được dữ liệu
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default React.memo(StockList)
