/* eslint-disable prettier/prettier */
// testmonials
import React from 'react'
import styled from 'styled-components'

const StyledFeedback = styled.div`
  section,
  .section {
    color: var(--default-color);
    background-color: var(--background-color);
    padding: 60px 0;
    scroll-margin-top: 72px;
    overflow: clip;
  }
  p {
    margin-top: 0;
    margin-bottom: 1rem;
}


p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    unicode-bidi: isolate;
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
  .align-items-center {
    align-items: center !important;
  }
  .row {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    display: flex;
    flex-wrap: wrap;
    margin-top: calc(-1 * var(--bs-gutter-y));
    margin-right: calc(-0.5 * var(--bs-gutter-x));
    margin-left: calc(-0.5 * var(--bs-gutter-x));
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
  .testimonials .info h3 {
    font-weight: 700;
    font-size: 32px;
  }
  .testimonials .swiper {
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.05);
    background-color: var(--surface-color);
}
.swiper-horizontal {
    touch-action: pan-y;
}
.swiper {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    display: block;
}
.swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex
;
    transition-property: transform;
    transition-timing-function: var(--swiper-wrapper-transition-timing-function, initial);
    box-sizing: content-box;
}

















`
const Feedback = () => {
  return (
    <StyledFeedback>
      <section id="testimonials" className="testimonials section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 info" data-aos="fade-up" data-aos-delay={100}>
              <h3>Testimonials</h3>
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident.
              </p>
            </div>
            <div className="col-lg-7" data-aos="fade-up" data-aos-delay={200}>
              <div className="swiper init-swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="testimonial-item">
                      <div className="d-flex">
                        <img
                          src="/images/member/1.jpg"
                          className="testimonial-img flex-shrink-0"
                          alt
                        />
                        <div>
                          <h3>Saul Goodman</h3>
                          <h4>Ceo &amp; Founder</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        <span>
                          Proin iaculis purus consequat sem cure digni ssim donec porttitora entum
                          suscipit rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh
                          et. Maecen aliquam, risus at semper.
                        </span>
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                    </div>
                  </div>
                  {/* End testimonial item */}
                  <div className="swiper-slide">
                    <div className="testimonial-item">
                      <div className="d-flex">
                        <img
                          src="/images/member/2.jpg"
                          className="testimonial-img flex-shrink-0"
                          alt
                        />
                        <div>
                          <h3>Sara Wilsson</h3>
                          <h4>Designer</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        <span>
                          Export tempor illum tamen malis malis eram quae irure esse labore quem
                          cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua
                          noster fugiat irure amet legam anim culpa.
                        </span>
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                    </div>
                  </div>
                  {/* End testimonial item */}
                  <div className="swiper-slide">
                    <div className="testimonial-item">
                      <div className="d-flex">
                        <img
                          src="/images/member/3.jpg"
                          className="testimonial-img flex-shrink-0"
                          alt
                        />
                        <div>
                          <h3>Jena Karlis</h3>
                          <h4>Store Owner</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        <span>
                          Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla
                          quem veniam duis minim tempor labore quem eram duis noster aute amet eram
                          fore quis sint minim.
                        </span>
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                    </div>
                  </div>
                  {/* End testimonial item */}
                  <div className="swiper-slide">
                    <div className="testimonial-item">
                      <div className="d-flex">
                        <img
                          src="/images/member/4.jpg"
                          className="testimonial-img flex-shrink-0"
                          alt
                        />
                        <div>
                          <h3>Matt Brandon</h3>
                          <h4>Freelancer</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        <span>
                          Fugiat enim eram quae cillum dolore dolor amet nulla culpa multos export
                          minim fugiat minim velit minim dolor enim duis veniam ipsum anim magna
                          sunt elit fore quem dolore labore illum veniam.
                        </span>
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                    </div>
                  </div>
                  {/* End testimonial item */}
                  <div className="swiper-slide">
                    <div className="testimonial-item">
                      <div className="d-flex">
                        <img
                          src="/images/member/5.jpg"
                          className="testimonial-img flex-shrink-0"
                          alt
                        />
                        <div>
                          <h3>John Larson</h3>
                          <h4>Entrepreneur</h4>
                          <div className="stars">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                        </div>
                      </div>
                      <p>
                        <i className="bi bi-quote quote-icon-left" />
                        <span>
                          Quis quorum aliqua sint quem legam fore sunt eram irure aliqua veniam
                          tempor noster veniam enim culpa labore duis sunt culpa nulla illum cillum
                          fugiat legam esse veniam culpa fore nisi cillum quid.
                        </span>
                        <i className="bi bi-quote quote-icon-right" />
                      </p>
                    </div>
                  </div>
                  {/* End testimonial item */}
                </div>
                <div className="swiper-pagination" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </StyledFeedback>
  )
}

export default Feedback
