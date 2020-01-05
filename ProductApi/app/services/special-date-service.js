const repository = require('../infra/repositories/special-date-repository');
const moment = require('moment');

module.exports = {
  list: async () => {
    return await repository.getAll();
  },

  getById: async id => {
    const result = await repository.find({ query: { _id: id } });
    if (result.length == 1) {
      let date = result[0];
      date.date = moment.utc(date.date);
      return date;
    }
  },

  create: async entity => {
    if (entity) {
      entity.date = moment.utc(entity.date);
      const result = await repository.find({ query: { _id: entity._id } });
      if (result.length == 0) {
        return repository.add(entity);
      }
    }
  },

  update: async entity => {
    if (!entity)
      return null;
    entity.date = moment.utc(entity.date);
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
