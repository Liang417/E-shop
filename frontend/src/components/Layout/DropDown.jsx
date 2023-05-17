import React from 'react';
import { Link } from 'react-router-dom';
import { categoriesData } from '../../static/data';
import styles from '../../styles/styles';

const DropDown = ({ setDropDown }) => {
  return (
    <div className="pb-4 w-[270px] bg-[#fafafa] absolute z-30 rounded-b-md shadow-sm border-[1px] border-indigo-300">
      {categoriesData &&
        categoriesData.map((item, index) => (
          <Link to={`/products?category=${item.title}`}>
            <div
              key={index}
              className={`${styles.normalFlex} hover:bg-gray-200 cursor-pointer`}
              onClick={() => setDropDown(false)}
            >
              <img
                src={item.image_Url}
                style={{
                  width: '25px',
                  height: '25px',
                  objectFit: 'contain',
                  marginLeft: '10px',
                  userSelect: 'none',
                }}
                alt=""
              />
              <h3 className="m-3 cursor-pointer select-none">{item.title}</h3>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default DropDown;
