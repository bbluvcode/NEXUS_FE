/* eslint-disable prettier/prettier */
// bb_member
import React from 'react'
import styled from 'styled-components'

const StyledTeam = styled.div`
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
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--heading-color);
    font-family: var(--heading-font);
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

  .bb_members .team-member {
    background-color: var(--surface-color);
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
    position: relative;
    border-radius: 5px;
    transition: 0.5s;
    padding: 30px;
    height: 100%;
  }
  .align-items-start {
    align-items: flex-start !important;
  }
  .d-flex {
    display: flex !important
;
  }
  .bb_members .team-member .pic {
    overflow: hidden;
    width: 150px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .bb_members .team-member .pic img {
    transition: ease-in-out 0.3s;
  }
  .img-fluid {
    max-width: 100%;
    height: auto;
  }

  .bb_members .team-member .member-info {
    padding-left: 30px;
  }

  .bb_members .team-member h4 {
    font-weight: 700;
    margin-bottom: 5px;
    font-size: 20px;
  }
  .bb_members .team-member span {
    display: block;
    font-size: 15px;
    padding-bottom: 10px;
    position: relative;
    font-weight: 500;
  }

  .bb_members .team-member span::after {
    content: '';
    position: absolute;
    display: block;
    width: 50px;
    height: 1px;
    background: color-mix(in srgb, var(--default-color), transparent 85%);
    bottom: 0;
    left: 0;
  }
  .bb_members .team-member p {
    margin: 10px 0 0 0;
    font-size: 14px;
  }
  .bb_members .team-member .social {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: start;
    width: 100%;
  }
  .bb_members .team-member .social a {
    background: color-mix(in srgb, var(--default-color), transparent 94%);
    transition: ease-in-out 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    width: 36px;
    height: 36px;
  }
  .bb_members .team-member .social a i {
    color: color-mix(in srgb, var(--default-color), transparent 20%);
    font-size: 16px;
    margin: 0 2px;
  }
`
const Team = () => {
  return (
    <StyledTeam>
      <section id="bb_members" className="bb_members section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Our Team</h2>
          <p>
            Meet the dedicated professionals behind our innovative telecommunications and networking
            solutions.
          </p>
        </div>
        {/* End Section Title */}
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={100}>
              <div className="team-member d-flex align-items-start">
                <div className="pic">
                  <img src="/images/member/1.jpg" className="img-fluid" alt="Binh Vo" />
                </div>
                <div className="member-info">
                  <h4>Binh Vo</h4>
                  <span>Team Leader</span>
                  <p>
                    Responsible for overseeing the team's strategies and ensuring the success of all
                    telecommunications projects.
                  </p>
                  <div className="social">
                    <a href="#">
                      <i className="bi bi-twitter" />
                    </a>
                    <a href="#">
                      <i className="bi bi-facebook" />
                    </a>
                    <a href="#">
                      <i className="bi bi-instagram" />
                    </a>
                    <a href="#">
                      <i className="bi bi-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Team Member */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={200}>
              <div className="team-member d-flex align-items-start">
                <div className="pic">
                  <img src="/images/member/2.jpg" className="img-fluid" alt="Nguyen Van Nhat" />
                </div>
                <div className="member-info">
                  <h4>Nguyen Van Nhat</h4>
                  <span>Technical Support Specialist</span>
                  <p>
                    Specializes in designing, implementing, and maintaining robust network
                    infrastructures for clients.
                  </p>
                  <div className="social">
                    <a href="#">
                      <i className="bi bi-twitter" />
                    </a>
                    <a href="#">
                      <i className="bi bi-facebook" />
                    </a>
                    <a href="#">
                      <i className="bi bi-instagram" />
                    </a>
                    <a href="#">
                      <i className="bi bi-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Team Member */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={300}>
              <div className="team-member d-flex align-items-start">
                <div className="pic">
                  <img src="/images/member/3.jpg" className="img-fluid" alt="Bui Tam Man" />
                </div>
                <div className="member-info">
                  <h4>Bui Tam Man</h4>
                  <span>Systems Analyst</span>
                  <p>
                    Focuses on evaluating business needs and designing technological solutions to
                    optimize operations.
                  </p>
                  <div className="social">
                    <a href="#">
                      <i className="bi bi-twitter" />
                    </a>
                    <a href="#">
                      <i className="bi bi-facebook" />
                    </a>
                    <a href="#">
                      <i className="bi bi-instagram" />
                    </a>
                    <a href="#">
                      <i className="bi bi-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Team Member */}
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay={400}>
              <div className="team-member d-flex align-items-start">
                <div className="pic">
                  <img src="/images/member/4.jpg" className="img-fluid" alt="Vo Dang Gia Huy" />
                </div>
                <div className="member-info">
                  <h4>Vo Dang Gia Huy</h4>
                  <span>Network Engineer</span>
                  <p>
                    Ensures seamless customer experiences by addressing technical issues and
                    providing expert support.
                  </p>
                  <div className="social">
                    <a href="#">
                      <i className="bi bi-twitter" />
                    </a>
                    <a href="#">
                      <i className="bi bi-facebook" />
                    </a>
                    <a href="#">
                      <i className="bi bi-instagram" />
                    </a>
                    <a href="#">
                      <i className="bi bi-linkedin" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* End Team Member */}
          </div>
        </div>
      </section>
    </StyledTeam>
  )
}

export default Team
