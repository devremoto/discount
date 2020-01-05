const repository = require('../infra/repositories/user-repository');
const moment = require('moment');

module.exports = {
  list: async () => {
    return await repository.getAll();
  },

  getById: async id => {
    const result = await repository.find({ query: { _id: id } });
    if (result.length == 1) {
      let user = result[0];
      user.birthdate = moment.utc(user.birthdate);
      return user;
    }
  },

  create: async entity => {
    if (entity) {
      entity.birthdate = moment.utc(entity.birthdate);
      const result = await repository.find({ query: { _id: entity._id } });
      if (result.length == 0) {
        return repository.add(entity);
      }
    }
  },

  update: async entity => {
    if (!entity)
      return null;
    entity.birthdate = moment.utc(entity.birthdate);
    const result = await repository.find({ query: { _id: entity._id } });
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
