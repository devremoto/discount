const JL = require('jsnlog').JL;
const repository = require('../infra/repositories/product-repository');
const discountService = require('./discount-service');

const userService = {
  list: async userId => {
    discount = await discountService.discount(userId);
    return new Promise((resolve, reject) => {
      repository.getAll().then(
        result => {
          products = result.map(x => {
            x.discount.pct = discount ? discount.pct : 0;
            x.discount.value = discount ? (x.price * discount.pct) / 100 : 0;
            x.discount.finalPrice = discount
              ? x.price * (1 - discount.pct / 100)
              : x.price;
            return x;
          });
          resolve(products);
        },
        error => reject(error)
      );
    });
  },

  getById: (id, userId) => {
    return discountService.productDiscount(id, userId);
  },

  create: entity => {
    return new Promise((resolve, reject) => {
      if (entity) {
        repository.find({ query: { _id: entity._id } }).then(result => {
          if (result.length == 0) {
            repository
              .add(entity)
              .then(result => {
                resolve(result);
              })
              .catch(err => {
                JL('mongo-service:create').error(err);
                reject(err);
              });
          } else {
            reject(`"product already exists" ${JSON.stringify(result.name)}`);
          }
        });
      } else {
        reject('error');
      }
    });
  },

  update: entity => {
    return new Promise((resolve, reject) => {
      repository
        .find({ query: { _id: entity._id } })
        .then(result => {
          JL('mongo-service:update').info('find');
          if (result.length >= 1) {
            repository
              .update(entity)
              .then(result => {
                resolve(result);
              })
              .catch(error => {
                JL('mongo-service:update error').error(error);
                reject(error);
              });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  delete: id => {
    return new Promise((resolve, reject) => {
      repository.find({ query: { _id: id } }).then(entity => {
        if (entity) {
          repository.delete(id).then(result => {
            resolve(result);
          });
        } else {
          reject(`Can not delete the Id ${id} not found`);
        }
      });
    });
  }
};
module.exports = userService;
