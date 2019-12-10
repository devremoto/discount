const client = require('../infra/grpc/client/discount.client');
const { createRpcCommand } = require('../infra/circuitbreaker/command-factory');
const repository = require('../infra/repositories/product-repository');
const discountRPCService = client.getService('Discount');

const discountService = {
  discount: userId => {
    const command = createRpcCommand(
      discountRPCService.GetDiscount.bind(discountRPCService)
    );
    const request = { userId };
    return new Promise((resolve, _) => {
      command
        .execute(request)
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          console.log('==============================================');
          console.log(error);
          resolve(null);
        });
    });
  },

  productDiscount: (productId, userId) => {
    const command = createRpcCommand(
      discountRPCService.GetProductDiscount.bind(discountRPCService)
    );
    const request = { productId, userId };
    return new Promise((resolve, reject) => {
      command
        .execute(request)
        .then(response => {
          resolve(response);
        })
        .catch(_ => {
          repository.find({ query: { _id: productId } }).then(
            result => {
              console.log('==============================================');
              console.log(result);
              if (result.length) {
                resolve(result[0]);
              } else {
                reject('Product not found');
              }
            },
            error => {
              console.log('==============================================');
              console.log(error);
              reject(error);
            }
          );
        });
    });
  }
};

module.exports = discountService;
