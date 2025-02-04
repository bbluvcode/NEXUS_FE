/* eslint-disable prettier/prettier */
import React from 'react'
import styled from 'styled-components'

const StyledServicesbb = styled.div`
  section,
  .section {
    color: var(--default-color);
    background-color: var(--background-color);
    padding: 60px 0;
    scroll-margin-top: 72px;
    overflow: clip;
  }

  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }
  a {
    color: var(--accent-color);
    text-decoration: none;
    transition: 0.3s;
  }
  section {
    display: block;
    unicode-bidi: isolate;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--heading-color);
    font-family: var(--heading-font);
  }

  .section-title h2 {
    font-size: 32px;
    font-weight: 500;
    margin-bottom: 20px;
    padding-bottom: 20px;
    position: relative;
  }
  .section-title h2:before {
    content: '';
    position: absolute;
    display: block;
    width: 160px;
    height: 1px;
    background: color-mix(in srgb, var(--default-color), transparent 60%);
    left: 0;
    right: 0;
    bottom: 1px;
    margin: auto;
  }
  .section-title h2::after {
    content: '';
    position: absolute;
    display: block;
    width: 60px;
    height: 3px;
    background: var(--accent-color);
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
  }

  .section-title p {
    margin-bottom: 0;
  }
  .servicesbb .service-item {
    background-color: var(--surface-color);
    text-align: center;
    border: 1px solid color-mix(in srgb, var(--default-color), transparent 85%);
    padding: 80px 20px;
    transition: all ease-in-out 0.3s;
    height: 100%;
  }

  .servicesbb .service-item .icon {
    margin: 0 auto;
    width: 64px;
    height: 64px;
    background: var(--accent-color);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    transition: 0.3s;
    transform-style: preserve-3d;
  }

  .servicesbb .service-item .icon::before {
    position: absolute;
    content: '';
    left: -8px;
    top: -8px;
    height: 100%;
    width: 100%;
    background: color-mix(in srgb, var(--accent-color), transparent 80%);
    border-radius: 5px;
    transition: all 0.3s ease-out 0s;
    transform: translateZ(-1px);
  }

  .servicesbb .service-item .icon i {
    color: var(--contrast-color);
    font-size: 28px;
    transition: ease-in-out 0.3s;
  }

  .servicesbb .service-item h3 {
    font-weight: 700;
    margin: 10px 0 15px 0;
    font-size: 22px;
  }

  .stretched-link::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    content: '';
  }
  .servicesbb .service-item p {
    line-height: 24px;
    font-size: 14px;
    margin-bottom: 0;
  }
  .section-title {
    text-align: center;
    padding-bottom: 60px;
    position: relative;
  }
`
const Servicesbb = () => {
  return (
    <StyledServicesbb>
      <section id="servicesbb" className="servicesbb section">
        {/* Section Title */}
        <div className="container section-title text-center" data-aos="fade-up">
          <h2>Our Service</h2>
          <p>
            Providing cutting-edge telecommunications solutions to meet the diverse needs of our
            customers with excellence and reliability.
          </p>
        </div>
        {/* End Section Title */}
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={100}>
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="fa-solid fa-wifi" />
                </div>
                <a href="#" className="stretched-link">
                  <h3>Broadband Internet</h3>
                </a>
                <p>
                  Experience high-speed broadband servicesbb tailored for streaming, online gaming,
                  and video conferencing with unmatched reliability.
                </p>
              </div>
            </div>
            {/* End Service Item */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="fa-solid fa-plug" />
                </div>
                <a href="#" className="stretched-link">
                  <h3>Dial-Up servicesbb</h3>
                </a>
                <p>
                  Affordable and efficient dial-up connections designed for areas with limited
                  broadband access, ensuring consistent connectivity.
                </p>
              </div>
            </div>
            {/* End Service Item */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={300}>
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="fa-solid fa-phone" />
                </div>
                <a href="#" className="stretched-link">
                  <h3>Landline servicesbb</h3>
                </a>
                <p>
                  Reliable landline solutions for both residential and business needs, offering
                  advanced features such as voicemail and call forwarding.
                </p>
              </div>
            </div>
            {/* End Service Item */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={400}>
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="fa-solid fa-network-wired" />
                </div>
                <a href="#" className="stretched-link">
                  <h3>Corporate Networking</h3>
                </a>
                <p>
                  Customized networking solutions for businesses, ensuring seamless communication
                  and enhanced productivity across all operations.
                </p>
              </div>
            </div>
            {/* End Service Item */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={500}>
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="fa-solid fa-shield-alt" />
                </div>
                <a href="#" className="stretched-link">
                  <h3>Security Solutions</h3>
                </a>
                <p>
                  Advanced security solutions to protect your network and data, ensuring a secure
                  environment for all your operations.
                </p>
              </div>
            </div>
            {/* End Service Item */}
            <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={600}>
              <div className="service-item position-relative">
                <div className="icon">
                  <i className="fa-solid fa-headset" />
                </div>
                <a href="#" className="stretched-link">
                  <h3>24/7 Customer Support</h3>
                </a>
                <p>
                  Dedicated support available around the clock to assist with any issues or queries,
                  ensuring your satisfaction.
                </p>
              </div>
            </div>
            {/* End Service Item */}
          </div>
        </div>
      </section>
    </StyledServicesbb>
  )
}

export default Servicesbb
