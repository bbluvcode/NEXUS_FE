import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getAllEmployees } from '../../services/employeeService'

const API_BASE_URL = 'http://localhost:5185/api/news'

const News = () => {
  const [newsList, setNewsList] = useState([])
  const [employees, setEmployees] = useState([]) // Giả sử bạn đang sử dụng một state riêng cho nhân viên
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsResponse = await axios.get(API_BASE_URL)
        const employeeResponse = await getAllEmployees()
        setNewsList(newsResponse.data)
        setEmployees(employeeResponse.data)
      } catch (error) {
        console.error('Error fetching news', error)
      }
    }

    fetchNews()
  }, [])

  // Hàm để lọc các thẻ <img> trong nội dung và trả về ảnh đầu tiên
  const extractFirstImage = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html')
    const image = doc.querySelector('img')
    return image ? image.src : ''
  }

  // Hàm để chuyển hướng tới trang chi tiết bài viết
  const handleDetail = (newsId) => {
    navigate(`/newsDetail/${newsId}`)
  }

  return (
    <div className="container mt-4">
      <div
        className="text-center mb-4"
        style={{ fontSize: '100px', fontWeight: 'bold', color: '#333' }}
      >
        Nexus
      </div>
      <div className="row">
        {newsList
          .filter((news) => news.status === true)
          .map((news) => {
            const firstImage = extractFirstImage(news.content)

            return (
              <div key={news.newsId} className="col-md-4 mb-4">
                <div
                  className="card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDetail(news.newsId)}
                >
                  {firstImage ? (
                    <img
                      src={firstImage}
                      alt={`news-image-${news.newsId}`}
                      className="card-img-top"
                    />
                  ) : (
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center"
                      style={{ height: '200px', backgroundColor: '#f0f0f0' }}
                    >
                      <p className="text-center">No Image</p>
                    </div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{news.title}</h5>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default News
