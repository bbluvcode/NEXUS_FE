/* eslint-disable prettier/prettier */
import React from 'react'
import styled from 'styled-components'

const StyledAbout = styled.div`

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

  section {
    display: block;
    unicode-bidi: isolate;
  }

  .container,
  .container-fluid,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .container-xxl {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    width: 100%;
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
    margin-right: auto;
    margin-left: auto;
  }
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  .align-self-start {
    align-self: flex-start !important;
  }
  .position-relative {
    position: relative !important;
  }
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  img,
  svg {
    vertical-align: middle;
  }
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  img {
    overflow-clip-margin: content-box;
    overflow: clip;
  }
  .about .pulsating-play-btn {
    position: absolute;
    left: calc(50% - 47px);
    top: calc(50% - 47px);
  }
  .about .content h3 {
    font-size: 2rem;
    font-weight: 700;
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

  @media (min-width: 1200px) {
    .h3,
    h3 {
      font-size: 1.75rem;
    }
  }
  .h3,
  h3 {
    font-size: calc(1.3rem + 0.6vw);
  }
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.3rem;
    font-weight: 500;
    line-height: 1.2;
    color: var(--bs-heading-color);
  }

  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
    margin-top: 0;
    margin-bottom: 1.5rem;
  }

  .about .content ul li {
    display: flex;
    align-items: flex-start;
    /* margin-top: 40px; */
  }
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
    unicode-bidi: isolate;
  }
  .about .content ul i {
    flex-shrink: 0;
    font-size: 48px;
    color: var(--heading-color);
    margin-right: 20px;
  }
  .fa-solid,
  .fas {
    font-weight: 900;
  }
`

const About = () => {
  return (
    <StyledAbout>
      <div id="about" className="about section">
        <div className="container">
          <div className="row gy-4 gx-5">
            <div className="col-lg-6 position-relative align-self-start">
              <img
                src="/images/homepage/telecom.jpg"
                className="img-fluid"
                alt="About Nexus Service Marketing System"
              />
              <a
                href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                className="glightbox pulsating-play-btn"
              />
            </div>
            <div className="col-lg-6 content">
              <h3>About Us</h3>
              <p>
                Nexus Service Marketing System is a trusted provider of communication solutions,
                specializing in Broadband, Dial-Up, and Landline services. Our goal is to ensure
                seamless connectivity and exceptional service for every customer.
              </p>
              {/* <p>
              We pride ourselves on delivering cutting-edge technology, reliable performance, and dedicated support. 
              Whether you’re looking for fast internet speeds, cost-effective dial-up solutions, or a dependable 
              landline for your home or business, Nexus is your go-to partner for connectivity.
            </p> */}
              <ul>
                <li>
                  <i className="fa-solid fa-wifi" />
                  <div>
                    <h5>Broadband Services</h5>
                    <p>High-speed internet for streaming, gaming, and work.</p>
                  </div>
                </li>
                <li>
                  <i className="fa-solid fa-plug" />
                  <div>
                    <h5>Dial-Up Solutions</h5>
                    <p>Affordable internet access for areas with limited options.</p>
                  </div>
                </li>
                <li>
                  <i className="fa-solid fa-phone" />
                  <div>
                    <h5>Landline Services</h5>
                    <p>Reliable voice communication with essential features.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StyledAbout>
  )
}

export default About
