const client = require('../infra/grpc/client/discount.client');
const { createRpcCommand } = require('../infra/circuitbreaker/command-factory');
const repository = require('../infra/repositories/product-repository');
const discountRPCService = client.getService('Discount');

const discountService = {
  discount: async userId => {
    const command = createRpcCommand(
      discountRPCService.GetDiscount.bind(discountRPCService)
    );
    const request = { userId };
    return await command.execute(request);
  },

  productDiscount: async (productId, userId) => {
    const command = createRpcCommand(
      discountRPCService.GetProductDiscount.bind(discountRPCService)
    );
    const request = { productId, userId };
    try {
      const response = await command.execute(request);
      return response;
    } catch (error) {
      const result = await repository.find({ query: { _id: productId } });
      if (result.length){
        return result[0]
      }
    }
  }
};

module.exports = discountService;
