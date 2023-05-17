import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import { Link, useNavigate } from 'react-router-dom';
import { backendURL } from '../../apiConfig';
import { AiOutlineMessage } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsOfShop } from '../../redux/slice/productSlice';

const ProductDetailInfo = ({ data }) => {
  const { shopProducts } = useSelector((state) => state.product);
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMessageSubmit = () => {
    navigate('/inbox?conversation=example_ID');
  };

  useEffect(() => {
    dispatch(getAllProductsOfShop(data.shop._id));
  }, []);

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
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">{data.description}</p>
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
              <Link to={`/shop/profile/${data.shop._id}`}>
                <img
                  src={`${backendURL}/${data?.shop?.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] border border-black rounded-full"
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="pb-2 text-[15px]">(4/5) Ratings</h5>
                </div>
              </Link>
            </div>
            <p className="pt-2">
              {data.shop.description ||
                '華碩在各方面追求極致創新與卓越品質，以成為備受推崇的科技創新領導企業為品牌願景，成立至今推出的無數產品及服務皆深受全球各界肯定。每年獲獎數眾多，2018年平均每天獲得超過11個獎項，其中更包括多項來自全球最具聲望的媒體機構給予的榮耀，包括：入選美國《財富》雜誌「全球最受推崇公司」、英國《湯森路透》「全球百大科技領導企業」，以及美國《富比士》雜誌「最受信賴公司」，每個獎項皆是對華碩的肯定，更是激勵我們持續追求完美、尋求透過科技改善人類生活的動力來源。'}
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">{data.shop?.createdAt?.slice(0, 10)}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:{' '}
                <span className="font-[500]">{shopProducts && shopProducts.length}</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">324</span>
              </h5>
              <div
                className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                onClick={handleMessageSubmit}
              >
                <span className="text-white flex items-center">
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </div>
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
