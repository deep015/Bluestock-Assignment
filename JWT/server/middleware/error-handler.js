const errorHandlerMiddleware = (err, req, res, next) => {
  console.error('🔥 Error:', err); // log full error in terminal

  if (err.statusCode) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  // ✅ Always respond with JSON
  return res.status(500).json({
    msg: 'Something went wrong',
    error: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandlerMiddleware;
