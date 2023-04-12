import React from 'react'
import Header from '../../Components/Reusables/header'
import Hero from '../../Components/StaysLanding/Hero'
import BrowseProperty from '../../Components/StaysLanding/BrowseProperty'
import Footer from '../../Components/HomeLandingPage/Footer'
import ImageCollage from '../../Components/StaysLanding/ImageCollage'

const StaysLandingPage = () => {
  return (
    <>
        <Header/>
        <Hero/>
        <BrowseProperty/>
        <ImageCollage/>
        <Footer/>
    
    </>
  )
}

export default StaysLandingPage