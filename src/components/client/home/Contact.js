/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  createSuppportRequest,
  handleSetSuppportRequest,
} from '../../../redux/customer/supportRequestSlice'

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
  const dispatch = useDispatch()
  const supportRequest = useSelector((state) => state.supportRequests.supportRequest)

  const [formData, setFormData] = useState({
    title: '',
    detailContent: '',
    dateResolved: null,
    email: '',
    customerName: '',
  })

  const schema = yup.object().shape({
    title: yup.string().min(3).max(50).required('Title is required'),
    detailContent: yup.string().min(5).required('Detail Content is required'),
    email: yup.string().email().required('Email is required'),
    customerName: yup.string().min(3).max(50).required('Email is required'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    dispatch(handleSetSuppportRequest({ ...supportRequest, [name]: value }))
  }

  const onSubmit = async () => {
    const action = await dispatch(createSuppportRequest(supportRequest)) // Gửi yêu cầu
    if (createSuppportRequest.fulfilled.match(action)) {
      console.log('Gửi thành công')

      // Clear input fields
      setFormData({
        title: '',
        detailContent: '',
        email: '',
        customerName: '',
      })

      Swal.fire({
        title: 'Request Submitted!',
        text: 'Your support request has been successfully created.',
        icon: 'success',
        confirmButtonText: 'OK',
        draggable: true,
      })
    } else if (createSuppportRequest.rejected.match(action)) {
      console.error('Gửi thất bại:', action.error.message)

      Swal.fire({
        title: 'Submission Failed',
        text: action.error.message || 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      })
    }
  }

  return (
    <StyledContact>
      <section id="contact" className="contact section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact Us</h2>
          <p>
            Get in touch with us for any inquiries, support, or collaboration opportunities. We're
            here to help!
          </p>
        </div>

        {/* Google Maps */}
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

        {/* Contact Info */}
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
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={400}>
                <i className="bi bi-telephone flex-shrink-0" />
                <div>
                  <h3>Call Us</h3>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={500}>
                <i className="bi bi-envelope flex-shrink-0" />
                <div>
                  <h3>Email Us</h3>
                  <p>mnhbgr@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form & Support Request */}
            <div className="col-lg-8">
              <form onSubmit={handleSubmit(onSubmit)} className="php-email-form">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      {...register('customerName')}
                      name="customerName"
                      className="form-control"
                      placeholder="Your Name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      {...register('email')}
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required
                      onChange={handleChange}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      {...register('title')}
                      className="form-control"
                      name="title"
                      placeholder="Subject / Title"
                      required
                      onChange={handleChange}
                    />
                    {errors.title && <p className="text-danger">{errors.title.message}</p>}
                  </div>
                  <div className="col-md-12">
                    <textarea
                      {...register('detailContent')}
                      className="form-control"
                      name="detailContent"
                      rows={6}
                      placeholder="Message / Detail Content"
                      required
                      onChange={handleChange}
                    />
                    {errors.detailContent && (
                      <p className="text-danger">{errors.detailContent.message}</p>
                    )}
                  </div>

                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </StyledContact>
  )
}

export default Contact
