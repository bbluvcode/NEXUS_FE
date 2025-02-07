/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:5185/api/news'

const NewsDetail = () => {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const navigate = useNavigate()  // Hook để điều hướng

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`)
        setNews(response.data)
      } catch (error) {
        console.error('Error fetching news detail', error)
      }
    }

    fetchNewsDetail()
  }, [id])

  if (!news) {
    return <p>Loading...</p>
  }

  return (
    <div className="container mt-4">
      {/* Nút Trở về */}
      <button
        onClick={() => navigate(-1)}  // Quay lại trang trước đó
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Back
      </button>

      <h1>{news.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: news.content }} />
    </div>
  )
}

export default NewsDetail
