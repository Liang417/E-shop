import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import ProductDetails from '../components/ProductDetails/ProductDetails.jsx';
import RelatedProduct from '../components/ProductDetails/RelatedProduct.jsx';
import Footer from '../components/Layout/Footer';
import { useParams } from 'react-router-dom';
import { productData } from '../static/data';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const productName = id.replace(/-/g, ' ');

  useEffect(() => {
    const data = productData.find((product) => product.name === productName);
    setData(data);
  }, []);

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
