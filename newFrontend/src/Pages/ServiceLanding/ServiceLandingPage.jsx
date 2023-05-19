import React from "react";
import Header from "../../Components/Reusables/header";
import Hero from "../../Components/ServiceLanding/Hero";
import ToDo from "../../Components/ServiceLanding/ToDo";
import Footer from "../../Components/HomeLandingPage/Footer";

const ServiceLandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <ToDo />
      <Footer />
    </>
  );
};

export default ServiceLandingPage;
