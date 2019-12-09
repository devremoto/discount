const client = require('../infra/grpc/client/discount.client');

const discountService = {
  discount: userId => {
    return new Promise((resolve, reject) => {
      const discountRPCService = client.getService('Discount');

      discountRPCService.GetDiscount({ userId }, (error, response) => {
        error ? reject(error) : resolve(response);
      });
    });
  },

  productDisount: (productId, userId) => {
    return new Promise((resolve, reject) => {
      const discountRPCService = client.getService('Discount');
      const request = { productId, userId };

      discountRPCService.GetProductDiscount(request, (error, response) => {
        error ? reject(error) : resolve(response);
      });
    });
  }
};

module.exports = discountService;
