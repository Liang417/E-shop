import React from 'react';
import Header from '../components/Layout/Header.jsx';
import Hero from '../components/Layout/Hero.jsx';
import Categories from '../components/Layout/Categories.jsx';
import BestDeals from '../components/Route/BestDeals.jsx';
import Events from '../components/Events/Events.jsx';
import FeaturedProduct from '../components/Route/FeaturedProduct.jsx';
import Sponsored from '../components/Layout/Sponsored.jsx';
import Footer from '../components/Layout/Footer.jsx';

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;
