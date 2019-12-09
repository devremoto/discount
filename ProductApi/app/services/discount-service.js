const client = require('../infra/grpc/client/discount.client');
const { createRpcCommand } = require("../infra/circuitbreaker/command-factory");
// Let's say rpcClient.get(request, (err, res) ...) is your function
// You really need .bind()!

const request = new messages.YourMessage();

command
  .execute(request)
  .then(response => {
    // do something with response
  })
  .catch(error => {
    // do something with error
  });

const discountService = {
  discount: userId => {
    return new Promise((resolve, reject) => {



      const discountRPCService = client.getService('Discount');
      //const command = createRpcCommand(discountRPCService.GetDiscount.bind(discountRPCService));
      //discountRPCService.GetDiscount({ userId })
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
