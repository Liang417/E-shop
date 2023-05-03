import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import ProductCard from '../Product/ProductCard.jsx';
import { productData } from '../../static/data';

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const descending = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const topFive = descending.slice(0, 5);
    setData(topFive);
  }, []);

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
