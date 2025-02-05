/* eslint-disable prettier/prettier */
import React from "react";
import PropTypes from "prop-types";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 200px)" }}>
      <div className="text-center">
        <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">{message}</p>
      </div>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string,
};

export default Loading;
