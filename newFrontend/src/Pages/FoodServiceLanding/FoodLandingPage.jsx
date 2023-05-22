import React from "react";
import Header from "../../Components/Reusables/header";
import Hero from "../../Components/FoodServiceLanding/Hero";
import ToEat from '../../Components/FoodServiceLanding/ToEat'
import Footer from "../../Components/HomeLandingPage/Footer";

const FoodLandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <ToEat />
      <Footer />
    </>
  );
};

export default FoodLandingPage;
