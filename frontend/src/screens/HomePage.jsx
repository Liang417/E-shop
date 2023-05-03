import React from 'react';
import Header from '../components/Layout/Header.jsx';
import Hero from '../components/Route/Hero.jsx';
import Categories from '../components/Route/Categories.jsx';
import BestDeals from '../components/Route/BestDeals.jsx';
import Events from '../components/Events/Events.jsx';
import FeaturedProduct from '../components/Route/FeaturedProduct.jsx';
import Sponsored from '../components/Route/Sponsored.jsx';
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
