import React from 'react'
import Hero from '../Components/heroPage'
import Yexplore from '../Components/explorePage'
import Navbar from '../Components/navBar'
import Explore from '../Components/explore'


const Homepage = () => {
  return (
    <div>
      <Navbar/>
        <Hero/>
        <Explore/>
        {/* <Yexplore/> */}
    </div>
  )
}

export default Homepage