/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKeywords } from '../../../redux/others/keyWordSlice';
import BtnModal from '../../../components/button/BtnModal';

const Keyword = () => {
  const dispatch = useDispatch();
  const { items: keywords, loading, error } = useSelector((state) => state.keywords);

  useEffect(() => {
    dispatch(fetchKeywords());
  }, [dispatch]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Keywords</h2>
        <BtnModal name="Create New Keyword" iform="KeywordCreateForm" style="primary" />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="row">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th>Word</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {keywords.length > 0 ? (
                keywords.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.words}</td>
                    <td>{item.status?"active":"disactive"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">No keywords available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Keyword;
