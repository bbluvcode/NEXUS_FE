/* eslint-disable prettier/prettier */
import React from 'react';
import BtnReq from '../../components/button/BtnReq';

function Services(props) {
  const PlanList = [
    {
      PlanId: 1,
      PlanName: 'Basic Broadband',
      SecurityDeposit: 1000.0,
      Description: 'Affordable broadband plan with 50 Mbps speed.',
      isUsing: true,
    },
    {
      PlanId: 2,
      PlanName: 'Premium Broadband',
      SecurityDeposit: 2000.0,
      Description: 'High-speed broadband plan with 200 Mbps speed and unlimited data.',
      isUsing: true,
    },
    {
      PlanId: 3,
      PlanName: 'Basic Dial-Up',
      SecurityDeposit: 500.0,
      Description: 'Entry-level dial-up plan with 56 Kbps speed.',
      isUsing: false,
    },
    {
      PlanId: 4,
      PlanName: 'Standard Dial-Up',
      SecurityDeposit: 700.0,
      Description: 'Standard dial-up plan with extended hours and 56 Kbps speed.',
      isUsing: true,
    },
    {
      PlanId: 5,
      PlanName: 'Residential Landline',
      SecurityDeposit: 300.0,
      Description: 'Landline plan for residential users with unlimited local calls.',
      isUsing: true,
    },
    {
      PlanId: 6,
      PlanName: 'Business Landline',
      SecurityDeposit: 500.0,
      Description: 'Landline plan for businesses with unlimited local and national calls.',
      isUsing: true,
    },
  ];

  return (
    <div>
      <div className="container mt-3">
        <div className='row'>
        {PlanList.map((item) => (
          <div key={item.PlanId} className="card mb-3 col-3 me-2" style={{ width: 400 }}>
            <div className="card-body">
              <h4 className="card-title">{item.PlanName}</h4>
              <p className="card-text">{item.Description}</p>
              <p className="card-text">
                Security Deposit: <strong>${item.SecurityDeposit.toFixed(2)}</strong>
              </p>
              <p className="card-text">
                Status: <strong>{item.isUsing ? 'Active' : 'Inactive'}</strong>
              </p>
              <BtnReq/>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
