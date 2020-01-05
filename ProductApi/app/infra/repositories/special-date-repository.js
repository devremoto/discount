const connection = require('../mongo-connection');
const model = require('../../models/special-date');

module.exports = {
  add: async data => {
    return await connection.add(model, data);
  },

  delete: async id => {
    return await connection.delete(model, id);
  },

  update: async data => {
    return await connection.update(model, data);
  },

  getAll: async () => {
    const docs = await connection.getAll(model);
    return docs;
  },
  find: async data => {
    return await connection.find({ model, query: data.query });
  }
};
