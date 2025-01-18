/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeStatusFeedback,
  fetchFeedbacks,
  handleSetFeedback,
} from '../../../redux/customer/feedbackSlice'
import BtnModal from '../../../components/button/BtnModal'
import CIcon from '@coreui/icons-react'
import { cilAssistiveListeningSystem, cilMouthSlash, cilUser } from '@coreui/icons'

const Feedbacks = () => {
  const dispatch = useDispatch()
  const feedbacks = useSelector((state) => state.feedbacks.items)

  useEffect(() => {
    dispatch(fetchFeedbacks())
  }, [dispatch])
  const formatDateSystem = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  return (
    <div>
      <div className="d-flex justify-content-between">
        <h2>List of Customer Feedback</h2>
        {/* <BtnModal name="Create New Customer Request" iform="0" style="primary" /> */}
      </div>
      <div className="row">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>fbID</th>
              <th>Date</th>
              <th>Title</th>
              <th>FeedBackContent</th>
              <th>CustomerName</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((item) => (
                <tr key={item.feedBacksId}>
                  <td>{item.feedBackId}</td>
                  <td>{formatDateSystem(item.date)}</td>
                  <td>{item.title}</td>
                  <td>{item.feedBackContent}</td>
                  {/* <td>{item.status}</td> */}
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
                    <BtnModal name={<CIcon icon={cilUser} />} iform="FeedbackDetail" style="outline-primary" />
                  </td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default React.memo(Feedbacks)
