import React from 'react';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import HomeSection from '../components/HomeSection';
import Nav from '../components/Nav';

const Home = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <HomeSection />
      <Footer />
    </div>
  );
};

export default Home;