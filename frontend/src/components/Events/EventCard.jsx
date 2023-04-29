import React from 'react';
import styles from '../../styles/styles';
import CountDown from './CountDown.jsx';
import { Link } from 'react-router-dom';

const EventCard = () => {
  return (
    <div className="w-full block bg-white rounded-lg lg:flex p-2">
      <div className="w-full lg:-w[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14pro max 8/256gb</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid quos atque fugit hic
          illum. Laborum ut possimus assumenda perferendis aut iure, sed eum omnis sequi atque
          aspernatur nulla facere odit ipsam et tempore corrupti saepe, nam minima unde nobis rerum.
          Porro labore est consectetur nostrum! Saepe minus voluptas dolore dolorum? Lorem ipsum
          dolor sit, amet consectetur adipisicing elit.
        </p>
        <br />
        <p>
          Aliquid quos atque fugit hicillum. Laborum ut possimus assumenda perferendis aut iure, sed
          eum omnis sequi atque aspernatur nulla facere odit ipsam et tempore corrupti saepe, nam
          minima unde nobis rerum. Porro labore est consectetur nostrum! Saepe minus voluptas dolore
          dolorum?
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b35] pr-3 line-through">1099$</h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">999$</h5>
          </div>
          <span className="pr-3 font-[400] text-[18px] text-[#44a55e]">120 sold</span>
        </div>
        <CountDown />
        <br />
        <div className="flex items-center justify-end">
          <Link to="/">
            <div
              className={`${styles.button} text-[#fff] hover:text-yellow-300 hover:bg-opacity-80`}
            >
              See Details
            </div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5 hover:text-yellow-300 hover:bg-opacity-80`}
            onClick={() => {}}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
