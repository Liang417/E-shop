import React, { useState } from 'react';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';

const ProductDetailInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-8 pb-5 ">
        <div className="relative">
          <h5
            className={
              'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? <div className={`${styles.active_indicator}`}></div> : null}
        </div>
        <div className="relative">
          <h5
            className={
              'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? <div className={`${styles.active_indicator}`}></div> : null}
        </div>
        <div className="relative">
          <h5
            className={
              'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? <div className={`${styles.active_indicator}`}></div> : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            A product detail page (PDP) is a web page on an eCommerce site that presents the
            description of a specific product in view. The details displayed often include size,
            color, price, shipping information, reviews, and other relevant information customers
            may want to know before making a purchase. Typically, this information is presented
            alongside an actual photo of the item, as well as an “add to cart” button.
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            The product detail page is a crucial element to your eCommerce strategy because it is
            where the fate of a potential sale lives. The product detail page should be carefully
            designed so that a hierarchy of information is presented in an intuitive manner. This
            page has the potential to optimize the consumer experience by presenting product details
            the way your target consumer wishes to view content on your site. This means
            establishing a healthy balance between too much information and just the right amount of
            detail to sway buyers’ interest in completing a purchase.
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            It’s important to also take mobile devices into account when designing a product detail
            page. Real estate is scarce on mobile pages, and users tend to make decisions in a few
            taps. Be sure to optimize your mobile product pages when designing them, and reference
            best practices when doing so. The product details page also offers an optimal location
            to serve site visitors product recommendations. It gives you the opportunity to display
            other similar products, items frequently purchased together, or incorporate
            personalization into your product recommendations for increased likelihood of a purchase
            and/or drive upsell.
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No Reviews yet!</p>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-1/2">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                alt=""
                className="w-[50px] h-[50px]  rounded-full"
              />
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">({data.shop.ratings}) Ratings</h5>
              </div>
            </div>
            <p className="pt-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas minus nostrum
              omnis? A dolore quidem eum pariatur cumque quasi nemo, ipsum omnis voluptatibus
              mollitia, libero amet? Earum cum fuga assumenda.
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">11 June,2023</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products: <span className="font-[500]">1,688</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">9,99</span>
              </h5>
              <Link to="/">
                <div className={`${styles.button} !rounded-[4px] !h-[40px] mt-3`}>
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailInfo;
