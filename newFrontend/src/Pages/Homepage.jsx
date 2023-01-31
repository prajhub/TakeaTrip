import React from 'react'
import Hero from '../Components/heroPage'
import Yexplore from '../Components/explorePage'
import Navbar from '../Components/navBar'
import Explore from '../Components/explore'
import TopDestinations from '../Components/TopDestinations'
import Features from '../Components/Features'
import Footer from '../Components/Footer'


const Homepage = () => {
  return (
    <div>
      <Navbar/>
        <Hero/>
        <Explore/>
        <TopDestinations/>
        <Features/>
        <Footer/>
    </div>
  )
}

export default Homepage