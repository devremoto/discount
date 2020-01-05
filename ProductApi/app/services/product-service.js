const repository = require('../infra/repositories/product-repository');
const discountService = require('./discount-service');

const productService = {
  list: async userId => {
    const discount = await discountService.discount(userId);
    const result = await repository.getAll();

    const products = result.map(x => {
      x.discount.pct = discount ? discount.pct : 0;
      x.discount.value = discount ? (x.price * discount.pct) / 100 : 0;
      x.discount.finalPrice = discount
        ? x.price * (1 - discount.pct / 100)
        : x.price;
      return x;
    });
    return products;
  },

  getById: async (id, userId) => {
    return await discountService.productDiscount(id, userId);
  },

  create: async entity => {
    if (entity) {
      const result = await repository.find({ query: { _id: entity._id } });
      if (result.length == 0) {
        return repository.add(entity);
      }
    }
  },

  update: async entity => {
    const result = repository.find({ query: { _id: entity._id } });
    if (result.length >= 1) {
      await repository.update(entity)
      return result;
    }
  },

  delete: async id => {
    const entity = await repository.find({ query: { _id: id } });
    if (entity) {
      const result = repository.delete(id);
      return result;
    }
  }
};

module.exports = productService;
