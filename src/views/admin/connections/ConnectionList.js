import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConnectionDiaryModal from "./ConnectionDiaryModal";

const ConnectionList = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDiaryModal, setShowDiaryModal] = useState(false);
  const [selectedConnectionId, setSelectedConnectionId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5185/api/Connection/get-all-connections")
      .then((res) => {
        if (res.status === 200) {
          setConnections(res.data.data);
        } else {
          throw new Error("Failed to fetch connections");
        }
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Error fetching connection data");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleShowDiaryModal = (connectionId) => {
    setSelectedConnectionId(connectionId);
    setShowDiaryModal(true);
  };

  if (loading) return <p>Loading connections...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Connection List</h2>
      <table className="table table-hover text-center align-middle">
        <thead>
          <tr>
            <th>Connection ID</th>
            <th>Date Created</th>
            <th>Active</th>
            <th>Description</th>
            <th>ServiceOrder ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {connections.length > 0 ? (
            connections.map((conn) => (
              <tr key={conn.connectionId}>
                <td>{conn.connectionId}</td>
                <td>{new Date(conn.dateCreate).toLocaleDateString()}</td>
                <td>{conn.isActive ? "Active" : "Inactive"}</td>
                <td>{conn.description ?? "N/A"}</td>
                <td>{conn.serviceOrderId}</td>
                <td className="d-flex justify-content-center">
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleShowDiaryModal(conn.connectionId)}
                  >
                    Diary
                  </button>
                  <button className="btn btn-warning">Deactivate</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "red" }}>
                No connections available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer />
      <ConnectionDiaryModal
        show={showDiaryModal}
        handleClose={() => setShowDiaryModal(false)}
        connectionId={selectedConnectionId}
      />
    </div>
  );
};

export default ConnectionList;
