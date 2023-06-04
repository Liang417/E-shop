import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import styles from '../styles/styles';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Product/ProductCard';
import Loader from '../components/Layout/Loader';

const ProductPage = () => {
  const { products, isLoading } = useSelector((state) => state.product);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const category = searchParams.get('category');

  useEffect(() => {
    // if category is present then filter the products
    if (category) {
      const descending = products && products.filter((item) => item.category === category);
      setData(descending);
    }
    // else show all the products
    else {
      const descending = products && [...products].sort((a, b) => b.sold_out - a.sold_out);
      setData(descending);
    }
    window.scrollTo(0, 0);
  }, [products, searchParams]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="mt-20 800px:mt-0">
            <Header activeHeading={3} category={category} />
          </div>
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
      )}
    </>
  );
};

export default ProductPage;
