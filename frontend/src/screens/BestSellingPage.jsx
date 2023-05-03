import React, { useEffect, useState } from 'react';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import styles from '../styles/styles';
import ProductCard from '../components/Product/ProductCard';
import { productData } from '../static/data';

const BestSellingPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const descending = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(descending);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
      <div className={`${styles.section} mt-8`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((item, index) => <ProductCard data={item} key={index} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;
