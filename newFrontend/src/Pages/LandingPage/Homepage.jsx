import React from 'react'
import Hero from '../../Components/HomeLandingPage/heroPage'
import Yexplore from '../../Components/HomeLandingPage/explorePage'
import Navbar from '../../Components/HomeLandingPage/navBar'
import Explore from '../../Components/HomeLandingPage/explore'
import TopDestinations from '../../Components/HomeLandingPage/TopDestinations'
import Features from '../../Components/HomeLandingPage/Features'
import Footer from '../../Components/HomeLandingPage/Footer'
import Trending from '../../Components/HomeLandingPage/Trending'

const Homepage = () => {
  return (
    <div>
      <Navbar/>
        <Hero/>
        <Explore/>
        <TopDestinations/>
        <Trending/>
        <Footer/>
    </div>
  )
}

export default Homepage