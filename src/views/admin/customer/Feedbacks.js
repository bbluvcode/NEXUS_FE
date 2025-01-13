/* eslint-disable prettier/prettier */
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeedbacks } from '../../../redux/customer/feedbackSlice'
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
        <BtnModal name="Create New Customer Request" iform="0" style="primary" />
      </div>
      <div className="row">
        <table className="table">
          <thead>
            <tr>
              <th>feedBackId</th>
              <th>Date</th>
              <th>title</th>
              <th>feedBackContent</th>
              <th>customerId</th>
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
                  <td>{item.customerId}</td>
                  <td className="d-flex">
                    <button
                      className={`text-white me-1 btn btn-${item.status ? 'info' : 'secondary'}`}
                    >
                      <CIcon icon={item.status ? cilAssistiveListeningSystem : cilMouthSlash} />
                    </button>
                    <BtnModal name={<CIcon icon={cilUser} />} iform="1" style="outline-primary" />
                    <BtnModal
                      name={<i className="fa fa-edit"></i>}
                      iform="1"
                      style="outline-warning"
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
    </div>
  )
}

export default React.memo(Feedbacks)
