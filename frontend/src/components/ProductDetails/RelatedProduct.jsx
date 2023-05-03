import React, { useEffect, useState } from 'react';
import { productData } from '../../static/data';
import styles from '../../styles/styles';
import ProductCard from '../Product/ProductCard.jsx';

const RelatedProduct = ({ data }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const relatedProduct = productData && productData.filter((item) => item.category === data.category);
    setProduct(relatedProduct);
  }, []);

  return (
    <div>
      {data ? (
        <div className={`${styles.section} p-4`}>
          <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {product && product.map((item, index) =>  
            <ProductCard data={item} key={index} />)}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RelatedProduct;
