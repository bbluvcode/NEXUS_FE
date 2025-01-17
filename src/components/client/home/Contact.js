/* eslint-disable prettier/prettier */
import React from 'react'
import styled from 'styled-components'

const StyledContact = styled.div`
  section,
  .section {
    color: var(--default-color);
    background-color: var(--background-color);
    padding: 60px 0;
    scroll-margin-top: 72px;
    overflow: clip;
  }
  .g-4,
  .gy-4 {
    --bs-gutter-y: 1.5rem;
  }
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }
  .section-title {
    text-align: center;
    padding-bottom: 60px;
    position: relative;
  }
  section {
    display: block;
    unicode-bidi: isolate;
  }
  .section-title {
    text-align: center;
    padding-bottom: 60px;
    position: relative;
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
  .section-title p {
    margin-bottom: 0;
  }

  .contact .info-item i {
    color: var(--contrast-color);
    background: var(--accent-color);
    font-size: 20px;
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    transition: all 0.3s ease-in-out;
    margin-right: 15px;
  }
  .bi::before,
  [class^='bi-']::before,
  [class*=' bi-']::before {
    display: inline-block;
    font-family: bootstrap-icons !important;
    font-style: normal;
    font-weight: normal !important;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: -0.125em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .contact .php-email-form {
    height: 100%;
  }

  .php-email-form .loading {
    display: none;
    background: var(--surface-color);
    text-align: center;
    padding: 15px;
    margin-bottom: 24px;
  }

  .php-email-form .error-message {
    display: none;
    background: #df1529;
    color: #ffffff;
    text-align: left;
    padding: 15px;
    margin-bottom: 24px;
    font-weight: 600;
  }
  .php-email-form .error-message {
    display: none;
    background: #df1529;
    color: #ffffff;
    text-align: left;
    padding: 15px;
    margin-bottom: 24px;
    font-weight: 600;
  }

  .contact .php-email-form button[type='submit'] {
    color: var(--contrast-color);
    background: var(--accent-color);
    border: 0;
    padding: 10px 36px;
    transition: 0.4s;
    border-radius: 50px;
  }
`

const Contact = () => {
  return (
    <StyledContact>
      <section id="contact" className="contact section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact Us</h2> {/* Tiêu đề rõ ràng hơn */}
          <p>
            Get in touch with us for any inquiries, support, or collaboration opportunities. We're
            here to help!
          </p>{' '}
          {/* Mô tả chi tiết hơn */}
        </div>

        {/* End Section Title */}
        <div className="mb-5" data-aos="fade-up" data-aos-delay={200}>
          <iframe
            style={{ border: 0, width: '100%', height: 270 }}
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
            frameBorder={0}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        {/* End Google Maps */}
        <div className="container" data-aos="fade-up" data-aos-delay={100}>
          <div className="row gy-4">
            <div className="col-lg-4">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={300}>
                <i className="bi bi-geo-alt flex-shrink-0" />
                <div>
                  <h3>Location</h3>
                  <p>391A NKKN Street, HCM City , VN 70000</p>
                </div>
              </div>
              {/* End Info Item */}
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={400}>
                <i className="bi bi-telephone flex-shrink-0" />
                <div>
                  <h3>Call Us</h3>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>
              {/* End Info Item */}
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={500}>
                <i className="bi bi-envelope flex-shrink-0" />
                <div>
                  <h3>Email Us</h3>
                  <p>mnhbgr@gmail.com</p>
                </div>
              </div>
              {/* End Info Item */}
            </div>
            <div className="col-lg-8">
              <form
                action="forms/contact.php"
                method="post"
                className="php-email-form"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={6}
                      placeholder="Message"
                      required
                      defaultValue={''}
                    />
                  </div>
                  <div className="col-md-12 text-center">
                    <div className="loading">Loading</div>
                    <div className="error-message" />
                    {/* <div className="sent-message">Your message has been sent. Thank you!</div> */}
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
            {/* End Contact Form */}
          </div>
        </div>
      </section>
    </StyledContact>
  )
}

export default Contact
