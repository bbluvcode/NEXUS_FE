/* eslint-disable prettier/prettier */
import React from 'react';
import BtnReq from '../../components/button/BtnReq';

function Services(props) {
  const PlanList = [
    {
      planId: 1,
      planName: 'Basic Broadband',
      securityDeposit: 1000.0,
      description: 'Affordable broadband plan with 50 Mbps speed.',
      isUsing: true,
    },
    {
      planId: 2,
      planName: 'Premium Broadband',
      securityDeposit: 2000.0,
      description: 'High-speed broadband plan with 200 Mbps speed and unlimited data.',
      isUsing: true,
    },
    {
      planId: 3,
      planName: 'Basic Dial-Up',
      securityDeposit: 500.0,
      description: 'Entry-level dial-up plan with 56 Kbps speed.',
      isUsing: false,
    },
    {
      planId: 4,
      planName: 'Standard Dial-Up',
      securityDeposit: 700.0,
      description: 'Standard dial-up plan with extended hours and 56 Kbps speed.',
      isUsing: true,
    },
    {
      planId: 5,
      planName: 'Residential Landline',
      securityDeposit: 300.0,
      description: 'Landline plan for residential users with unlimited local calls.',
      isUsing: true,
    },
    {
      planId: 6,
      planName: 'Business Landline',
      securityDeposit: 500.0,
      description: 'Landline plan for businesses with unlimited local and national calls.',
      isUsing: true,
    },
  ];

  return (
    <div>
      <div className="container mt-3">
        <div className='row'>
        {PlanList.map((item) => (
          <div key={item.planId} className="card mb-3 col-3 me-2" style={{ width: 400 }}>
            <div className="card-body">
              <h4 className="card-title">{item.planName}</h4>
              <p className="card-text">{item.description}</p>
              <p className="card-text">
                Security Deposit: <strong>${item.securityDeposit.toFixed(2)}</strong>
              </p>
              <p className="card-text">
                Status: <strong>{item.isUsing ? 'Active' : 'Inactive'}</strong>
              </p>
              <BtnReq serviceSelected={item}/>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
