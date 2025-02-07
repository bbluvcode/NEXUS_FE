/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKeywords, deleteKeyword } from '../../../redux/others/keyWordSlice'
import BtnModal from '../../../components/button/BtnModal'
import Swal from 'sweetalert2'

const Keyword = () => {
  const dispatch = useDispatch()
  const { items: keywords, loading, error } = useSelector((state) => state.keywords)

  useEffect(() => {
    dispatch(fetchKeywords())
  }, [dispatch])

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteKeyword(id))
      }
    })
  }

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
                {/* <th>Status</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {keywords.length > 0 ? (
                keywords.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.words}</td>
                    {/* <td>{item.status ? 'Active' : 'Inactive'}</td> */}
                    <td>
                      <button
                        className="btn btn-danger btn-sm text-white"
                        onClick={() => handleDelete(item.id)}
                      >
                          <i className="fa fa-trash" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No keywords available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Keyword
