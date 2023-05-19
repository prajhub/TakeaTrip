import React from "react";
import Hero from "../../Components/HomeLandingPage/heroPage";

import Navbar from "../../Components/HomeLandingPage/navBar";
import Explore from "../../Components/HomeLandingPage/explore";

import Footer from "../../Components/HomeLandingPage/Footer";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Explore />

      <Footer />
    </div>
  );
};

export default Homepage;
