// Create token and saving to cookies
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,  // the cookie can only be accessed by the server
    Secure: true,    // the cookie will only be sent over HTTPS
  };
};

res.status(statusCode).cookie('token', token, options).json({
  success: true,
  user,
  token,
});

module.exports = sendToken;