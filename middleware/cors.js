const CorsMiddleware = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'POST, PUT, GET, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods',
    'Origin, X-Requested-with, Content-Type, Accept, Authorization'
  );
  return next();
};

module.exports = CorsMiddleware;
