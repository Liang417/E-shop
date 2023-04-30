import React, { useEffect, useState } from 'react';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import styles from '../styles/styles';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import { productData } from '../static/data';

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const categoryData = searchParams.get('category');

  useEffect(() => {
    // if category is present then filter the products
    if (categoryData) {
      const descending =
        productData && productData.filter((item) => item.category === categoryData);
      setData(descending);
    }
    // else show all the products
    else {
      const descending = productData && productData.sort((a, b) => b.total_sell - a.total_sell);
      setData(descending);
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header activeHeading={3} category={categoryData} />
      <div className={`${styles.section} mt-8`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((item, index) => <ProductCard data={item} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">No products Found!</h1>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
