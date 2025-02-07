import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDataContext } from '../../../context/DataContext'
import { getAllEmployees } from '../../../services/employeeService'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:5185/api/news'

const NewsList = () => {
  const [newsList, setNewsList] = useState([])
  const { employees, setEmployees } = useDataContext()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsResponse = await axios.get(API_BASE_URL)
        const employeeResponse = await getAllEmployees()
        console.log(newsResponse.data)
        setNewsList(newsResponse.data)
        setEmployees(employeeResponse.data)
      } catch (error) {
        console.error('Error fetching news', error)
      }
    }

    fetchNews()
  }, [setEmployees])

  // Hàm để lọc các thẻ <img> trong nội dung
  const extractImages = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html')
    const images = doc.querySelectorAll('img')
    return Array.from(images)
  }

  // Hàm để chuyển hướng tới trang chỉnh sửa
  const handleEdit = (newsId) => {
    navigate(`/admin/EditNews/${newsId}`)
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">News List</h1>
      <button className="btn btn-primary mb-3" onClick={() => navigate('/admin/AddNews')}>
        Add News
      </button>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Images</th>
            <th>Employee</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {newsList.map((news) => {
            const employee = employees.find((emp) => emp.employeeId === news.employeeId)
            const images = extractImages(news.content)
            const status = news.status

            return (
              <tr key={news.newsId}>
                <td>{news.title}</td>
                <td>
                  {images.length > 0 ? (
                    images.map((image, index) => (
                      <img
                        key={index}
                        src={image.src}
                        alt={`news-image-${index}`}
                        style={{ width: '100px', height: 'auto', margin: '5px' }}
                      />
                    ))
                  ) : (
                    <p>No images found</p>
                  )}
                </td>
                <td>{employee ? employee.fullName : 'Unknown Employee'}</td>
                <td>{status ? 'Active' : 'Inactive'}</td>
                <td>
                  <button onClick={() => handleEdit(news.newsId)} className="btn btn-primary">
                    Edit
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default NewsList
