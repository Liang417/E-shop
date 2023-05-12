import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiURL } from '../../apiConfig.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${apiURL}/shop/create`, { activation_token }, { withCredentials: true })
          .then((res) => {
            toast.success('Your account has been created successfully!');
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setError(true);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <div>
          <p>Your account has been created successfully!</p>
          <div className="flex flex-col items-center justify-center mt-10">
            <Link to="/" reloadDocument>
              <span className="bg-green-600 text-white px-5 py-4 rounded-md hover:text-black">
                Go to HomePage
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerActivationPage;
