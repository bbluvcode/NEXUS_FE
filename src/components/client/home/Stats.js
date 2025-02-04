/* eslint-disable prettier/prettier */
import React from 'react'
import styled from 'styled-components'

const StyledStats = styled.div`
section, .section {
    color: var(--default-color);
    background-color: var(--background-color);
    padding: 60px 0;
    scroll-margin-top: 72px;
    overflow: clip;
}
.light-background {
    --background-color: #f1f7fc;
    --surface-color: #ffffff;
}
*, ::after, ::before {
    box-sizing: border-box;
}
user agent stylesheet
section {
    display: block;
    unicode-bidi: isolate;
}
.align-items-center {
    align-items: center !important;
}
.flex-column {
    flex-direction: column !important;
}

.d-flex {
    display: flex !important
;
}
.stats i {
    color: var(--contrast-color);
    background-color: var(--accent-color);
    box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.1);
    width: 54px;
    height: 54px;
    font-size: 24px;
    border-radius: 50px;
    border: 2px solid var(--background-color);
    display: inline-flex
;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
}

.fa-solid, .fas {
    font-weight: 900;
}
.fa-classic, .fa-regular, .fa-solid, .far, .fas {
    font-family: "Font Awesome 6 Free";
}
.fa, .fa-brands, .fa-classic, .fa-regular, .fa-sharp-solid, .fa-solid, .fab, .far, .fas {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    display: var(--fa-display, inline-block);
    font-style: normal;
    font-variant: normal;
    line-height: 1;
    text-rendering: auto;
}
.stats .stats-item {
    background-color: var(--surface-color);
    margin-top: -27px;
    padding: 30px 30px 25px 30px;
    width: 100%;
    position: relative;
    text-align: center;
    box-shadow: 0px 2px 35px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    z-index: 0;
}
.stats .stats-item span {
    font-size: 32px;
    display: block;
    margin: 10px 0;
    font-weight: 700;
    color: var(--heading-color);
}
.stats .stats-item p {
    padding: 0;
    margin: 0;
    font-family: var(--heading-font);
    font-size: 16px;
}


`
const Stats = () => {
  return (
    <StyledStats>
      <section id="stats" className="stats section light-background">
  <div className="container" data-aos="fade-up" data-aos-delay={100}>
    <div className="row gy-4">
      <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
        <i className="fa-solid fa-wifi" />
        <div className="stats-item">
          <span
            data-purecounter-start={0}
            data-purecounter-end={1500}
            data-purecounter-duration={1}
            className="purecounter"
          >1500</span>
          <p>Broadband Subscribers</p>
        </div>
      </div>
      {/* End Stats Item */}
      <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
        <i className="fa-solid fa-plug" />
        <div className="stats-item">
          <span
            data-purecounter-start={0}
            data-purecounter-end={800}
            data-purecounter-duration={1}
            className="purecounter"
          >800</span>
          <p>Dial-Up Users</p>
        </div>
      </div>
      {/* End Stats Item */}
      <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
        <i className="fa-solid fa-phone" />
        <div className="stats-item">
          <span
            data-purecounter-start={0}
            data-purecounter-end={1200}
            data-purecounter-duration={1}
            className="purecounter"
          >1200</span>
          <p>Landline Connections</p>
        </div>
      </div>
      {/* End Stats Item */}
      <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center">
        <i className="fa-solid fa-trophy" />
        <div className="stats-item">
          <span
            data-purecounter-start={0}
            data-purecounter-end={50}
            data-purecounter-duration={1}
            className="purecounter"
          >50</span>
          <p>Industry Awards</p>
        </div>
      </div>
      {/* End Stats Item */}
    </div>
  </div>
</section>

    </StyledStats>
  )
}

export default Stats
