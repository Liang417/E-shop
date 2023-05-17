import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import ProductCard from '../Product/ProductCard.jsx';
import { useSelector } from 'react-redux';

const BestDeals = () => {
  const { products } = useSelector((state) => state.product);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (products) {
      const descending = [...products].sort((a, b) => b.total_sell - a.total_sell);
      const topFive = descending.slice(0, 5);
      setData(topFive);
    }
  }, [products]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data && data.map((item, index) => <ProductCard data={item} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
