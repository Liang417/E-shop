import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { productData, categoriesData } from '../../static/data';
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import DropDown from './DropDown.jsx';
import Navbar from './Navbar.jsx';
import { useSelector } from 'react-redux';
import { backendURL } from '../../apiConfig';
import Cart from '../Cart/Cart.jsx';
import WishList from '../WishList/WishList.jsx';
import { RxCross1 } from 'react-icons/rx';

const Header = ({ activeHeading, category }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) => product.name.toLowerCase().includes(term.toLowerCase()));
    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    const handleDropDown = (e) => {
      if (!e.target.parentElement?.classList.contains('dropDown')) {
        setDropDown(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleDropDown);
    return () => {
      // Fixed
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleDropDown);
    };
  }, []);

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          {/* shop icon */}
          <div>
            <Link to="/">
              <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            ></input>
            <AiOutlineSearch size={30} className="absolute right-2 top-1.5 cursor-pointer" />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((item, index) => {
                    const product_name = item.name.replace(/\s+/g, '-');
                    return (
                      <Link to={`/product/${product_name}`} key={index}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={item.image_Url[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                        </div>
                        <h1>{item.name}</h1>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          {/* become seller button */}
          <div className={`${styles.button}`}>
            <Link to="/shop/sign-up">
              <h1 className="text-[#fff] flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
      {/* If active = true, fixed the navbar*/}
      <div
        className={`${
          active === true ? 'shadow-sm fixed top-0 left-0 z-10' : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div className={`${styles.section} ${styles.normalFlex} relative  justify-between `}>
          {/* categories */}
          <div
            className="dropDown relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block cursor-pointer "
            onClick={() => setDropDown(!dropDown)}
          >
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
            <span
              className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md `}
            >
              {category ? `${category}` : 'All Categories'}
            </span>
            <IoIosArrowDown size={20} className="absolute right-2 top-4 cursor-pointer" />
            {dropDown ? (
              <DropDown categoriesData={categoriesData} setDropDown={setDropDown} />
            ) : null}
          </div>
          {/* navItems */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          {/* cart/favorite/user icon */}
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishList(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]" onClick={() => setOpenCart(true)}>
                <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/user/profile">
                    <img
                      src={`${backendURL}${user.avatar}`}
                      alt=""
                      className="w-[35px] h-[35px] rounded-full"
                    />
                  </Link>
                ) : (
                  <Link to="/user/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishList ? <WishList setOpenCart={setOpenWishList} /> : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${active === true ? 'shadow-sm fixed top-0 left-0 z-10' : null}
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full h-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft size={40} className="ml-4" onClick={() => setOpen(true)} />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className=" cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]">
              <AiOutlineShoppingCart size={30} />
              <span className="absolute -right-1 -top-1 rounded-full bg-[#3bc177] w-5 h-5 p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                12
              </span>
            </div>
          </div>
        </div>

        {/* header sidebar */}
        {open && (
          <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
            <div className="fixed w-[60%] bg-[#fff] h-full top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      0
                    </span>
                  </div>
                </div>
                <RxCross1 size={30} className="ml-4 mt-5" onClick={() => setOpen(false)} />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((item) => {
                      const d = item.name;
                      const Product_name = d.replace(/\s+/g, '-');
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img src={item.image_Url[0].url} alt="" className="w-[50px] mr-2" />
                            <h5>{item.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-sign-up">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/user/profile">
                      <img
                        src={`${backendURL}${user.avatar}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link to="/user/login" className="text-[18px] pr-[10px] text-[#000000b7]">
                      Login /
                    </Link>
                    <Link to="/user/sign-up" className="text-[18px] text-[#000000b7]">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
