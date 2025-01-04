/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';

// Dữ liệu tin tức giả lập (bạn có thể thay đổi theo dữ liệu thật nếu cần)
const mockNewsData = [
  {
    NewsID: 1,
    Title: 'Tin tức 1',
    EmpID: 'emp123',
    Content: 'Nội dung tin tức 1',
    CreateDate: '2025-01-01T12:00:00',
    Status: true,
  },
  {
    NewsID: 2,
    Title: 'Tin tức 2',
    EmpID: 'emp123',
    Content: 'Nội dung tin tức 2',
    CreateDate: '2025-01-02T12:00:00',
    Status: false,
  },
  {
    NewsID: 3,
    Title: 'Tin tức 3',
    EmpID: 'emp124',
    Content: 'Nội dung tin tức 3',
    CreateDate: '2025-01-03T12:00:00',
    Status: true,
  },
];

const NewsList = () => {
  const [news, setNews] = useState([]);

  // Gán cứng dữ liệu tin tức
  useEffect(() => {
    setNews(mockNewsData);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">News List</h2>

      {/* Hiển thị các tin tức */}
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>NewsID</th>
            <th>Title</th>
            <th>EmpID</th>
            <th>Content</th>
            <th>CreateDate</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item, index) => (
            <tr key={item.NewsID}>
              <td>{item.NewsID}</td>
              <td>{item.Title}</td>
              <td>{item.EmpID}</td>
              <td>{item.Content}</td>
              <td>{new Date(item.CreateDate).toLocaleString()}</td>
              <td>{item.Status ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsList;
