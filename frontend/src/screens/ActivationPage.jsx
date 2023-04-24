import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiURL } from '../apiConfig.js';
import axios from 'axios';
import { toast } from 'react-toastify';

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${apiURL}/user/activation`, { activation_token })
          .then((res) => {
            toast.success("Your account has been created successfully!");
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
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {error ? <p>Your token is expired!</p> : <p>Your account has been created successfully!</p>}
    </div>
  );
};

export default ActivationPage;
