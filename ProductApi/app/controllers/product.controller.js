const JL = require('jsnlog').JL;
const service = require('../services/product-service');

module.exports = {
  list: async (req, res) => {
    var userId = req.header('X-USER-ID');
    try {
      const result = await service.list(userId);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error });
    }

  },

  getById: async (req, res) => {
    const id = req.params.id;
    var userId = req.header('X-USER-ID');
    try {
      const result = await service.getById(id, userId)
      res.send(result);
    } catch (error) {
      res.status(500).send({ error });
    }
  },

  create: async (req, res) => {
    try {
      const result = await service.create(req.body);
    res.status(201).send(result);
    } catch (error) {
      res.status(500).send({ error });
    }  
  },

  update: async (req, res) => {
    try {
      const result = await service
        .update(req.body);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error });
    }

  },

  delete: async (req, res) => {
    try {
      const result = await service
        .delete(req.params.id);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error });
    }

  }
};
