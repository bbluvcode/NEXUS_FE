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

function Services() {
  const { plans, setPlans, planFees, setPlanFees, loading, setLoading } = useDataContext();
  const [currentPage, setCurrentPage] = useState({});

  useEffect(() => {
    Promise.all([getAllPlans(), getAllPlanFees()])
      .then(([plansData, planFeesData]) => {
        setPlans(plansData);
        setPlanFees(planFeesData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [setPlans, setPlanFees, setLoading]);

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
        className={styles.carouselContainer}
        showThumbs={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        showStatus={false}
        centerMode
        centerSlidePercentage={100}
      >
        {plans.slice(0, 3).map((item) => (
          <div key={item.planId} className="card p-3 text-center">
            <div className="card-body">
              <h4 className="card-title">{item.planName}</h4>
              <p className="card-text">{item.description}</p>
              <p className="card-text">
                Security Deposit: <strong>${item.securityDeposit.toFixed(2)}</strong>
              </p>
              <p className="card-text">
                Status: <strong>{item.isUsing ? 'Active' : 'Inactive'}</strong>
              </p>
              {/* View button for the Card View */}
              <button
                className="btn btn-info btn-sm"
                onClick={() => alert(`View details for ${item.planName}`)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </Carousel>

      <div className="mt-5 d-flex flex-column">
        {plans.map((plan) => {
          const planFeeList = planFees.filter((fee) => fee.planId === plan.planId);
          const itemsPerPage = 5;
          const totalPages = Math.ceil(planFeeList.length / itemsPerPage);
          const currentPageIndex = currentPage[plan.planId] || 1;
          const displayedFees = planFeeList.slice((currentPageIndex - 1) * itemsPerPage, currentPageIndex * itemsPerPage);

          return (
            <div key={plan.planId} className="mb-5">
              <h4 className="card-title">{plan.planName}</h4>

              {planFeeList.length <= 5 ? (
                <div className="container" style={{ maxWidth: '1200px' }}>
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
                        style={{
                          width: '70%',
                          marginRight: 'auto',
                          marginLeft: 'auto',
                          marginTop: '20px',
                          marginBottom: '20px',
                          backgroundColor: 'white',
                          boxSizing: 'border-box',
                          transition: 'transform 0.3s ease-in-out',
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 0, 0, 0.125)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          padding: '20px',
                          position: 'relative',
                          paddingBottom: '30px',  // Add extra padding to the bottom to prevent cutting off content
                        }}
                      >
                        <div className="card-body">
                          <p>
                            <strong>{fee.planFeeName}:</strong> ${fee.rental.toFixed(2)}
                          </p>
                          <p>{fee.description}</p>
                          <button
                            className="btn btn-info btn-sm"
                            onClick={() => alert(`View details for ${fee.planFeeName}`)}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
              ) : (
                <div style={{ overflowX: 'auto', minHeight: '350px' }}>
                  <table className="table table-hover table-bordered mt-3" style={{ tableLayout: 'fixed' }}>
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
                            {/* <button
                              className="btn btn-primary btn-sm"
                              onClick={() => alert(`Register for ${fee.planFeeName}`)}
                            >
                              Register
                            </button> */}
                            <BtnReq serviceSelected={fee}/>
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
