import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import ProductDetails from '../components/ProductDetails/ProductDetails.jsx';
import RelatedProduct from '../components/ProductDetails/RelatedProduct.jsx';
import Footer from '../components/Layout/Footer';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
  const { events } = useSelector((state) => state.event);
  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const isEvent = searchParams.get('isEvent');
  const [activeHeading, setActiveHeading] = useState(0);

  useEffect(() => {
    if (isEvent) {
      const data = events && events.find((i) => i._id === id);
      setActiveHeading(4);
      setData(data);
    } else {
      const data = products && products.find((item) => item._id === id);
      setActiveHeading(3);
      setData(data);
    }
  }, [products, id, events, isEvent]);

  return (
    <div>
      <Header activeHeading={activeHeading} />
      <div className="mt-[60px] 800px:mt-0">
        <ProductDetails data={data} />
      </div>
      {data && <RelatedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
