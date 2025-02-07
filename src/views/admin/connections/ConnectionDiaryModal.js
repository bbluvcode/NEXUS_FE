import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const ConnectionDiaryModal = ({ show, handleClose, connectionId }) => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && connectionId) {
      axios
        .get(`http://localhost:5185/api/Connection/get-diary/${connectionId}`)
        .then((res) => {
          if (res.status === 200) {
            setDiaryEntries(res.data.data);
          } else {
            throw new Error("Failed to fetch diary entries");
          }
        })
        .catch((err) => {
          setError(err.data.message);
          toast.error("Error fetching connection diary");
        })
        .finally(() => setLoading(false));
    }
  }, [show, connectionId]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Connection Diary for {connectionId}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading diary entries...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : diaryEntries.length > 0 ? (
          <ul>
            {diaryEntries.map((entry) => (
              <li key={entry.diaryId}>
                <strong>Start Date:</strong> {new Date(entry.dateStart).toLocaleDateString()} <br />
                <strong>End Date:</strong> {entry.dateEnd ? new Date(entry.dateEnd).toLocaleDateString() : "N/A"}
              </li>
            ))}
          </ul>
        ) : (
          <p>No diary entries available for this connection.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConnectionDiaryModal;
