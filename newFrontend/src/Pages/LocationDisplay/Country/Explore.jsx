import React from 'react'

import Header from '../../../Components/Reusables/header'
import Hero from '../../../Components/LocationLanding/Country/hero'
import ImageGallery from '../../../Components/LocationLanding/Country/ImageGallery'
import TopDestinations from '../../../Components/LocationLanding/Country/Destinations'
import Description from '../../../Components/LocationLanding/Country/description'
import TopAttractions from '../../../Components/LocationLanding/Country/TopAttractions/TopAttractions'
import ToStay from '../../../Components/LocationLanding/Country/ToDo/ToStay'
import ToEat from '../../../Components/LocationLanding/Country/ToDo/ToEat'

 const Explore = () => {
  return (
    <>
        <Header/>
        <Hero/>
        <Description/>
        <TopDestinations/> 
        <TopAttractions/>
        <ToStay/>
        <ToEat/>


    </>
  )
}

export default Explore;
