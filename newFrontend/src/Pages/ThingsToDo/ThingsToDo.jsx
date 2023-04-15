import React from 'react'
import Header from '../../Components/Reusables/header'
import Hero from '../../Components/ThingsToDo/Hero'
import PopularThings from '../../Components/ThingsToDo/PopularThings'
import BusTours from '../../Components/ThingsToDo/Tours/BusTours'
import WaterTours from '../../Components/ThingsToDo/Tours/WaterTours'
import Footer from '../../Components/HomeLandingPage/Footer'

const ThingsToDo = () => {
  return (
    <>
        <Header/>
        <Hero/>
        <PopularThings/>
        <BusTours/>
        <WaterTours/>
        <Footer/>
    </>
  )
}

export default ThingsToDo