import React, { useEffect, useState } from 'react';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import styles from '../styles/styles';
import ProductCard from '../components/Product/ProductCard';
import { useSelector } from 'react-redux';
import Loader from '../components/Layout/Loader';

const BestSellingPage = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const [data, setData] = useState([]);

  useEffect(() => {
    const descending = products && [...products].sort((a, b) => b.sold_out - a.sold_out);
    setData(descending);
    window.scrollTo(0, 0);
  }, [products]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="mt-20 800px:mt-0">
            <Header activeHeading={2} />
          </div>
          <div className={`${styles.section} mt-8`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data && data.map((item, index) => <ProductCard data={item} key={index} />)}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
