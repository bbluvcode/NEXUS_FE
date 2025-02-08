/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import BtnReq from '../../components/button/BtnReq';
import styles from '../../style/ManStyle.module.css';
import Loading from '../../components/Loading';
import { getAllPlans } from '../../services/planService';
import { getAllPlanFees } from '../../services/planFeeService';
import { useDataContext } from '../../context/DataContext';
import { Pagination } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = 'http://localhost:5185/api/news'

function Services() {
  const navigate = useNavigate();
  const { plans, setPlans, planFees, setPlanFees, loading, setLoading } = useDataContext();
  const [newsList, setNewsList] = useState([])
  const [currentPage, setCurrentPage] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsResponse = await axios.get(API_BASE_URL)
        setNewsList(newsResponse.data)
      } catch (error) {
        console.error('Error fetching news', error)
      }
    }

    fetchNews()
  }, [])
  useEffect(() => {
    Promise.all([getAllPlans(), getAllPlanFees()])
      .then(([plansData, planFeesData]) => {
        setPlans(plansData);
        console.log(plansData);
        console.log(planFeesData);


        setPlanFees(planFeesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [setPlans, setPlanFees, setLoading]);

  const extractFirstImage = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, 'text/html')
    const image = doc.querySelector('img')
    return image ? image.src : ''
  }

  // Hàm để chuyển hướng tới trang chi tiết bài viết
  const handleDetail = (id, type) => {
    if (type === 'news') {
      navigate(`/newsDetail/${id}`)
    } else if (type === 'service') {
      navigate(`/ServicesDetail/${id}`)
    }
  }

  const handlePageChange = (planId, pageNumber) => {
    setCurrentPage((prev) => ({ ...prev, [planId]: pageNumber }));
  };

  if (loading) {
    return <Loading message="Loading data..." />;
  }

  return (
    <div className="container mt-5 mb-5">
      {/* Carousel Section */}
      <Carousel
        className="carouselContainer"
        showThumbs={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        showStatus={false}
        centerMode
        centerSlidePercentage={100}
      >
        {newsList
          .filter((news) => news.status === true)
          .map((news) => {
            const firstImage = extractFirstImage(news.content)

            return (
              <div
                key={news.newsId}
                className={`card p-3 text-center ${styles.newsCard}`}
                onClick={() => handleDetail(news.newsId, 'news')}
                style={{ cursor: 'pointer' }}
              >
                <div className="card-body">
                  {/* Hiển thị hình ảnh đầu tiên */}
                  {firstImage ? (
                    <img
                      src={firstImage}
                      alt={`news-image-${news.newsId}`}
                      className={`card-img-top ${styles.newsImage}`}
                    />
                  ) : (
                    <div
                      className="card-img-top d-flex align-items-center justify-content-center"
                      style={{
                        height: '200px',
                        backgroundColor: '#f0f0f0',
                        color: '#333',
                      }}
                    >
                      <p className="text-center">No Image</p>
                    </div>
                  )}
                  <h4 className="card-title">{news.title}</h4>
                  <p className="card-text">{news.description}</p>
                </div>
              </div>
            )
          })}
      </Carousel>


      <div className="mt-5 d-flex flex-column">
        {plans
          .filter((plan) => plan.isUsing === true).map((plan) => {
            const planFeeList = planFees.filter((fee) => fee.planId === plan.planId);
            const itemsPerPage = 5;
            const totalPages = Math.ceil(planFeeList.length / itemsPerPage);
            const currentPageIndex = currentPage[plan.planId] || 1;
            const displayedFees = planFeeList.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

            return (
              <div key={plan.planId} className="mb-5">
                <h4 className="card-title">{plan.planName}</h4>

                {planFeeList.length <= 5 ? (
                  <div className={`container ${styles.containerCustom}`}>
                    <Carousel
                      style={{
                        width: '100%',
                        margin: '0 auto',
                        paddingLeft: '0',
                        position: 'relative',
                        zIndex: 0,
                      }}
                      showThumbs={false}
                      infiniteLoop
                      useKeyboardArrows
                      showStatus={false}
                      showIndicators={false}
                      centerMode
                      centerSlidePercentage={33.33} // Show 3 items at once
                    >
                      {planFeeList.map((fee) => (
                        <div
                          key={fee.planFeeId}
                          className={`${styles.planFeeCard}`}
                        >
                          <div className="card-body">
                            <p>
                              <strong>{fee.planFeeName}:</strong> ${fee.rental.toFixed(2)}
                            </p>
                            <p>{fee.description}</p>
                            <button
                              className={`btn btn-info btn-sm mb-1 mt-1 ${styles.viewButton}`}
                              onClick={() => handleDetail(fee.planFeeId, 'service')}
                            >
                              View
                            </button>
                            <BtnReq serviceSelected={fee} />
                          </div>
                        </div>
                      ))}
                    </Carousel>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto', minHeight: '350px' }}>
                    <table className={`table table-hover table-bordered mt-3 ${styles.planFeeTable}`}>
                      <thead>
                        <tr>
                          <th>Plan Fee Name</th>
                          <th>Rental</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedFees.map((fee) => (
                          <tr key={fee.planFeeId}>
                            <td>{fee.planFeeName}</td>
                            <td>${fee.rental.toFixed(2)}</td>
                            <td>{fee.description}</td>
                            <td>
                              <BtnReq serviceSelected={fee} />
                              <button
                                className={`btn btn-info btn-sm mb-1 mt-1 ${styles.viewButton}`}
                                onClick={() => handleDetail(fee.planFeeId, 'service')}
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {planFeeList.length > 5 && (
                  <Pagination className="justify-content-center">
                    {[...Array(totalPages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPageIndex}
                        onClick={() => handlePageChange(plan.planId, index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Services;
