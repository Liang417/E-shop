// Create token and saving to cookies
const sendUserToken = (user, statusCode, res) => {
  const userToken = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true, // the cookie can only be accessed by the server
    // secure: true, // the cookie will only be sent over HTTPS
    // sameSite: 'none',
  };
  res.status(statusCode).cookie('user_token', userToken, options).json({
    success: true,
    user,
    userToken,
  });
};

const sendSellerToken = (seller, statusCode, res) => {
  const sellerToken = seller.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true, // the cookie can only be accessed by the server
    // secure: true, // the cookie will only be sent over HTTPS
    // sameSite: 'none',
  };
  res.status(statusCode).cookie('seller_token', sellerToken, options).json({
    success: true,
    seller,
    sellerToken,
  });
};

module.exports = { sendUserToken, sendSellerToken };
