import React from 'react';
import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { footerProductLinks, footerSupportLinks, footerCompanyLinks } from '../../static/data';

const Footer = () => {
  return (
    <div className="bg-[#000] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 py-7 bg-[#342ac8]">
        <h1 className="lg-text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-[40%]">
          <span className="text-[#56d879]">Subscribe</span> us for get news <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800
                sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
            Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="flex flex-col items-center">
          <img
            src="https://shopo.quomodothemes.website/assets/images/logo.svg"
            alt=""
            className="filter brightness-0 invert"
          />
          <p className="text-start mt-[10px] ml-[15%] sm:ml-[25%] md:ml-[33%] lg:ml-[15%] xl:ml-[25%] ">The home and elements needed to create beautiful products.</p>
          <div className="flex  mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter size={25} className="cursor-pointer ml-4" />
            <AiFillInstagram size={25} className="cursor-pointer ml-4" />
            <AiFillYoutube size={25} className="cursor-pointer ml-4" />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footerCompanyLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <div className="flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
        <span>Terms · Privacy Policy</span>
        <span>© 2023 Lewis. All rights reserved.</span>
      </div>
    </div>
  );
};

export default Footer;
