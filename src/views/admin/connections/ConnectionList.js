import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";

const ConnectionList = () => {
  const [connections, setConnections] = useState([]);
  const [filteredConnections, setFilteredConnections] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');


  useEffect(() => {
    axios
      .get("http://localhost:5185/api/Connection/get-all-connections")
      .then((res) => {
        if (res.status === 200) {
          setConnections(res.data.data);
          setFilteredConnections(res.data.data)
        } else {
          throw new Error("Failed to fetch connections");
        }
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Error fetching connection data");
      })
  }, []);

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    filterData(value, selectedStatus);
  };

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setSelectedStatus(value);
    filterData(searchTerm, value);
  };

  const filterData = (search, status) => {
    let filtered = connections;
    if (search) {
      filtered = filtered.filter(conn =>
        conn.connectionId.toLowerCase().includes(search) ||
        conn.serviceOrderId.toLowerCase().includes(search) ||
        formatDate(conn.dateCreate).toLowerCase().includes(search)
      );
    }
    if (status) {
      filtered = filtered.filter(conn => (status === "Active" ? conn.isActive : !conn.isActive));
    }
    setFilteredConnections(filtered);
  };

  const itemsPerPage = 6;
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(filteredConnections.length / itemsPerPage);
  const displayConnections = filteredConnections.slice(pagesVisited, pagesVisited + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>List of Connections</h2>
        <div className="d-flex align-items-center gap-3 w-75">
          <input
            type="text"
            placeholder="Search by ConnectionID, OrderID, StartDate"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
          />
          <select className="form-select w-50" value={selectedStatus} onChange={handleStatusFilter}>
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <table className="table table-hover table-striped table-bordered text-center align-middle">
        <thead>
          <tr>
            <th>Connection ID</th>
            <th>Date Created</th>
            <th>Status</th>
            <th>Description</th>
            <th>ServiceOrder ID</th>
            <th>Start Connection</th>
            <th>End Connection</th>
          </tr>
        </thead>
        <tbody>
          {displayConnections.length > 0 ? (
            displayConnections.map((conn) => (
              <tr key={conn.connectionId}>
                <td>{conn.connectionId}</td>
                <td>{new Date(conn.dateCreate).toLocaleDateString()}</td>
                <td>{conn.isActive ? "Active" : "Inactive"}</td>
                <td>{conn.description ?? "N/A"}</td>
                <td>{conn.serviceOrderId}</td>
                <td>{conn.firstConnectionDiary?.dateStart ? new Date(conn.firstConnectionDiary?.dateStart).toLocaleDateString() : "N/A"}</td>
                <td>{conn.firstConnectionDiary?.dateEnd ? new Date(conn.firstConnectionDiary?.dateEnd).toLocaleDateString() : "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", color: "red" }}>
                No connections available
              </td>
            </tr>
          )}
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

export default ConnectionList;
