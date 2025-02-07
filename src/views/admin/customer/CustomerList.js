/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomers, handleSetCustomer } from '../../../redux/customer/customerSlice'
import BtnModal from '../../../components/button/BtnModal'
import ReactPaginate from 'react-paginate'

const CustomerList = () => {
  const dispatch = useDispatch()
  const customers = useSelector((state) => state.customers.items)

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
    dispatch(fetchCustomers())
  }, [dispatch])

  useEffect(() => {
      setFilteredOrders(customers)
    }, [customers])


  const formatDateSystem = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const handleEditCustomer = (customer) => {
    dispatch(handleSetCustomer(customer))
  }
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of customer</h2>
        <BtnModal name="Create New Customer" iform="CustomerCreateForm" style="primary" />
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>FullName</th>
              <th>Gender</th>
              <th>DateOfBirth</th>
              <th>Address</th>
              <th>Email</th>
              <th>PhoneNumber</th>
              <th>IdentificationNo</th>
              <th></th>
              {/* <th>Image</th>
              <th>Password</th> */}
            </tr>
          </thead>
          <tbody>
            {displayOrders.length > 0 ? (
              displayOrders.map((item, index) => (
                <tr key={index}>
                  <td>{item.customerId}</td>
                  <td>{item.fullName}</td>
                  <td>{item.gender}</td>
                  <td>{formatDateSystem(item.dateOfBirth)}</td>
                  <td>{item.address}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.identificationNo}</td>
                  {/* <td>{item.image}</td>
        <td>{item.password}</td> */}
                  <td onClick={()=> handleEditCustomer(item)}>                
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="CustomerEditForm"
                      style="warning"
                      customer={item}
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
                  <td>TEST</td>
                  <td>TEST</td>
                  {/* <td>{item.image}</td>
        <td>{item.password}</td> */}
                  <td>
                    <BtnModal name={<i className="fa fa-edit"></i>} iform="CustomerEditForm" style="warning"/>
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

export default React.memo(CustomerList)
