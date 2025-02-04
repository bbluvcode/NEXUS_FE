/* eslint-disable prettier/prettier */
import React from 'react'
import styled from 'styled-components'

const StyledHero = styled.div`
  /* --default-color: #444444;
  --heading-color: rgb(73, 65, 185);
  --accent-color: rgba(117, 109, 230, 0.88);
  --contrast-color: #ffffff;
  --bs-gutter-y: 1.5rem; */
  .g-4,
  .gy-4 {
    --bs-gutter-y: 1.5rem;
  }

  .hero {
    width: 100%;
    min-height: calc(-112px + 100vh);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 80px 0px;
    overflow: hidden;
  }
  section,
  .section {
    color: var(--default-color);
    background-color: var(--background-color);
    scroll-margin-top: 72px;
    padding: 60px 0px;
    overflow: clip;
  }
  .light-background {
    --background-color: #f1f7fc;
    --surface-color: #ffffff;
  }
  .hero img {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    inset: 0px;
    opacity: 1;
    transform: none;
    transition-property:
      opacity,
      transform,
      -webkit-transform;
    transition-duration: 0.6s;
    pointer-events: auto;
  }
  .hero .container {
    z-index: 3;
  }
  .position-relative {
    position: relative !important;
  }
  .hero .welcome h2 {
    font-size: 48px;
    font-weight: 700;
    margin: 0px;
    color: var(--heading-color);
  }
  .hero .fade-down {
    opacity: 1;
    transform: none;
    transition-delay: 0.1s;
    transition-property:
      opacity,
      transform,
      -webkit-transform;
    transition-duration: 0.6s;
    pointer-events: auto;
  }
  .hero .welcome h2 {
    font-size: 48px;
    font-weight: 700;
    margin: 0px;
  }
  .hero .welcome p {
    font-size: 24px;
    margin: 0px;
    color: var(--default-color);
  }

  .hero .content {
    margin-top: 40px;
  }
  .align-items-stretch {
    align-items: stretch !important;
  }
  .hero .content .why-box {
    opacity: 1;
    transform: translateZ(0px) scale(1);
    transition-delay: 0.2s;
    transition-property:
      opacity,
      transform,
      -webkit-transform;
    transition-timing-function: ease-in-out;
    transition-duration: 0.6s;
    pointer-events: auto;
    color: var(--contrast-color);
    background: var(--accent-color);
    padding: 30px;
    border-radius: 4px;
  }
  .hero .content .why-box h3 {
    color: var(--contrast-color);
    font-weight: 700;
    font-size: 34px;
    margin-bottom: 30px;
    pointer-events: auto;
  }
  .hero p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
  }
  .hero .content .why-box p {
    margin-bottom: 30px;
    color: var(--contrast-color);
  }
  .hero .content .why-box .more-btn {
    color: var(--contrast-color);
    display: inline-block;
    background: color-mix(in srgb, var(--contrast-color), transparent 80%);
    padding: 6px 30px 8px;
    border-radius: 50px;
    transition: 0.4s ease-in-out;
  }
  .hero .content .why-box .more-btn i {
    font-size: 14px;
  }
  .justify-content-center {
    justify-content: center !important;
  }

  .flex-column {
    flex-direction: column !important;
  }
  .hero .content .icon-box {
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 15px;
    width: 100%;
    border-radius: 10px;
    background: color-mix(in srgb, var(--surface-color), transparent 20%);
    padding: 40px 30px;
    opacity: 1;
    transform: translateZ(0px) scale(1);
    transition-delay: 0.3s;
    transition-property:
      opacity,
      transform,
      -webkit-transform;
    transition-duration: 0.6s;
    pointer-events: auto;
  }
  .hero .content .icon-box i {
    font-size: 40px;
    color: var(--accent-color);
  }
  .bi-clipboard-data::before {
    content: '';
  }

  .bi::before {
    display: inline-block;
    font-style: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: -0.125em;
    -webkit-font-smoothing: antialiased;
    font-family: bootstrap-icons !important;
    font-weight: normal !important;
    font-variant: normal;
  }
  .hero .content .icon-box h4 {
    font-size: 20px;
    font-weight: 700;
    margin: 10px 0px 20px;
  }
  .hero .content .icon-box {
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 15px;
    width: 100%;
    border-radius: 10px;
    background: color-mix(in srgb, var(--surface-color), transparent 20%);
    padding: 40px 30px;
  }
  .hero .content .icon-box i {
    font-size: 40px;
    color: var(--accent-color);
  }
  .hero .content .icon-box p {
    font-size: 15px;
    color: color-mix(in srgb, var(--default-color), transparent 30%);
  }
  .bi-gem::before {
    content: '';
  }
  .bi-inboxes::before {
    content: '';
  }

`
function Hero(props) {
  return (
    <StyledHero>
      <section id="hero" className="hero section light-background">
        <img src="/images/homepage/telecom.png" />
        <div className="container position-relative">
          <div className="welcome position-relative fade-down">
            <h2>WELCOME TO NEXUS</h2>
            <p>Discover innovative solutions and top-notch designs tailored to your business.</p>
          </div>
          {/* End Welcome */}
          <div className="content row gy-4">
            <div className="col-lg-4 d-flex align-items-stretch">
              <div className="why-box" data-aos="zoom-out" data-aos-delay={200}>
                <h3>Why Choose NEXUS?</h3>

                <p>
                  Choosing NEXUS means choosing a partner dedicated to your growth and success.
                  Whether you require cutting-edge designs, strategic insights, or dependable
                  technology solutions, we combine creativity and technical precision to help you
                  achieve your goals. Our unwavering focus on quality and customer satisfaction has
                  earned us the trust and loyalty of countless clients across industries.
                </p>

                <div className="text-center">
                  <a href="#about" className="more-btn">
                    <span>Learn More</span> <i className="bi bi-chevron-right" />
                  </a>
                </div>
              </div>
            </div>
            {/* End Why Box */}
            <div className="col-lg-8 d-flex align-items-stretch">
              <div className="d-flex flex-column justify-content-center">
                <div className="row gy-4">
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box" data-aos="zoom-out" data-aos-delay={300}>
                      <i className="bi bi-wifi" /> {/* Broadband Icon */}
                      <h4>Broadband</h4>
                      <p>
                        Experience high-speed internet connectivity tailored for seamless streaming
                        and browsing.
                      </p>
                    </div>
                  </div>
                  {/* End Icon Box */}
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box" data-aos="zoom-out" data-aos-delay={400}>
                      <i className="bi bi-house-door" /> {/* Dial-Up Icon */}
                      <h4>Dial-Up</h4>
                      <p>
                        Reliable and cost-effective internet solutions for basic browsing and
                        communication.
                      </p>
                    </div>
                  </div>
                  {/* End Icon Box */}
                  <div className="col-xl-4 d-flex align-items-stretch">
                    <div className="icon-box" data-aos="zoom-out" data-aos-delay={500}>
                      <i className="bi bi-telephone-plus" /> {/* Landline Icon */}
                      <h4>Landline</h4>
                      <p>
                        Crystal-clear voice communication with our dependable landline services.
                      </p>
                    </div>
                  </div>
                  {/* End Icon Box */}
                </div>
              </div>
            </div>
          </div>
          {/* End Content */}
        </div>
      </section>

    </StyledHero>
  )
}

export default Hero
