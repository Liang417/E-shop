import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import ProductDetails from '../components/ProductDetails/ProductDetails.jsx';
import RelatedProduct from '../components/ProductDetails/RelatedProduct.jsx';
import Footer from '../components/Layout/Footer';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = products && products.find((item) => item._id === id);
    setData(data);
  }, [products, id]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <RelatedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
