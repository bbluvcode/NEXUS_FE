/* eslint-disable prettier/prettier */
import React from 'react'
import Hero from '../../components/client/home/Hero'
import About from '../../components/client/home/About'
import Contact from '../../components/client/home/Contact'
import Feedback from '../../components/client/home/Feedback'
import Services from '../../components/client/home/Services'
import Stats from '../../components/client/home/Stats'
import Team from '../../components/client/home/Team'

const Home = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <Services />
      <About />
      <Team />
      {/* <Feedback /> */}
      <Contact />
    </div>
  )
}

export default Home
