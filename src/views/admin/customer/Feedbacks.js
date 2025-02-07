/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeStatusFeedback,
  fetchFeedbacks,
  handleSetFeedback,
} from '../../../redux/customer/feedbackSlice'
import BtnModal from '../../../components/button/BtnModal'
import CIcon from '@coreui/icons-react'
import { cilAssistiveListeningSystem, cilMouthSlash, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { fetchKeywords } from '../../../redux/others/keyWordSlice'
import ReactPaginate from 'react-paginate'

const Feedbacks = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const feedbacks = useSelector((state) => state.feedbacks.items)
  const keywords = useSelector((state) => state.keywords.items)

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
    dispatch(fetchFeedbacks())
    dispatch(fetchKeywords())
  }, [dispatch])

  useEffect(() => {
    setFilteredOrders(feedbacks)
  }, [feedbacks])

  const formatDateSystem = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const maskSensitiveWords = (content, sensitiveWords) => {
    if (!content || !sensitiveWords) return content
    let maskedContent = content
    sensitiveWords.forEach((item) => {
      const regex = new RegExp(item.words, 'gi') // Case-insensitive
      maskedContent = maskedContent.replace(regex, '***')
    })
    return maskedContent
  }

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Customer Feedback</h2>
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>fbID</th>
              <th>Date</th>
              <th>Title</th>
              <th colSpan={2}>FeedBackContent</th>
              <th>CustomerName</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayOrders.length > 0 ? (
              displayOrders.map((item) => (
                <tr key={item.feedBackId}>
                  <td>{item.feedBackId}</td>
                  <td>{formatDateSystem(item.date)}</td>
                  <td>{item.title}</td>
                  <td>{maskSensitiveWords(item.feedBackContent, keywords)}</td>
                  <td>
                    {keywords.some((keyword) =>
                      item.feedBackContent.toLowerCase().includes(keyword.words),
                    ) && <span className="badge bg-warning text-dark">Sensitive</span>}
                  </td>
                  <td>{item.fullName}</td>
                  <td
                    className="d-flex"
                    onClick={() => {
                      dispatch(handleSetFeedback(item))
                    }}
                  >
                    <button
                      className={`text-white me-1 btn btn-${item.status ? 'info' : 'secondary'}`}
                      onClick={async () => {
                        await dispatch(changeStatusFeedback(item.feedBackId))
                        dispatch(fetchFeedbacks())
                      }}
                    >
                      <CIcon icon={item.status ? cilAssistiveListeningSystem : cilMouthSlash} />
                    </button>
                    <BtnModal
                      name={<CIcon icon={cilUser} />}
                      iform="FeedbackDetail"
                      style="outline-primary"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <></>
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

export default React.memo(Feedbacks)
