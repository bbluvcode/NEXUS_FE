import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CIcon from '@coreui/icons-react';
import { cilCheck, cilWarning } from '@coreui/icons';

const ServiceBillList = () => {
  const [serviceBills, setServiceBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServiceBills();
  }, []);

  const fetchServiceBills = () => {
    axios.get("http://localhost:5185/api/ServiceBill")
      .then(res => {
        if (res.status === 200) {
          const sortedBills = res.data.data.sort((a, b) => new Date(b.CreateDate) - new Date(a.CreateDate));
          setServiceBills(sortedBills);
          setFilteredBills(sortedBills);
        }
      })
      .catch(err => console.error("Error fetching service bills:", err));
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    if (value === '') {
      setFilteredBills(serviceBills);
    } else {
      const filtered = serviceBills.filter(bill =>
        bill.BillId.toString().includes(value) ||
        bill.Payer.toLowerCase().includes(value) ||
        formatDate(bill.CreateDate).includes(value)
      );
      setFilteredBills(filtered);
    }
  };

  const itemsPerPage = 6;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(filteredBills.length / itemsPerPage);
  
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <h2>List of Service Bills</h2>
      <input
        type="text"
        placeholder="Search by Bill ID, Payer, Create Date"
        value={searchTerm}
        onChange={handleSearch}
        className="form-control w-50 mb-3"
      />
      
      <table className="table table-hover table-striped table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Payer</th>
            <th>Create Date</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Pay Date</th>
            <th>Tax</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills.slice(pagesVisited, pagesVisited + itemsPerPage).map((bill, index) => (
            <tr key={index}>
              <td>{bill.billId}</td>
              <td>{bill.payer}</td>
              <td>{formatDate(bill.createDate)}</td>
              <td>{formatDate(bill.fromDate)}</td>
              <td>{formatDate(bill.toDate)}</td>
              <td>{formatDate(bill.payDate)}</td>
              <td>${bill.tax}</td>
              <td>${bill.total ? bill.total : 'N/A'}</td>
              <td>
                <CIcon icon={bill.isPay ? cilCheck : cilWarning} className={bill.isPay ? "text-success me-3" : "text-danger me-3"} />
                {bill.isPay ? ' Paid' : ' Unpaid'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="d-flex justify-content-center mt-3">
        <ReactPaginate
          previousLabel={<i className="fa fa-chevron-left"></i>}
          nextLabel={<i className="fa fa-chevron-right"></i>}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default React.memo(ServiceBillList);
