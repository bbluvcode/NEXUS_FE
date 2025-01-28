/* eslint-disable prettier/prettier */
import React from 'react'
import Contact from '../../components/client/home/Contact'
import AboutCom from '../../components/client/home/About'
import Services from '../../components/client/home/Services'

function About(props) {
  return (
    <div>
      <AboutCom />
      <Services />
      <Contact />
    </div>
  )
}

export default About