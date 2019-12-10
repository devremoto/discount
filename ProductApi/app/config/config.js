module.exports = {
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/productdb',
  APP_PORT: process.env.APP_PORT || 5001,
  APP_URL_PREFIX: process.env.APP_URL_PREFIX || '',
  GRPC_SERVER: process.env.GRPC_SERVER || 'localhost:5003'
};
