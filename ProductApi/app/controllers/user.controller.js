const JL = require('jsnlog').JL;
const service = require('../services/user-service');

module.exports = {
  list: (_, res) => {
    service
      .list()
      .then(result => {
        JL('controller:list').info(result);
        console.log(result);
        res.send(result);
      })
      .catch(error => {
        JL('controller:list:error').error(error);
        res.status(500).send({ error });
      });
  },

  getById: (req, res) => {
    const id = req.params.id;
    service
      .getById(id)
      .then(result => {
        res.send(result);
      })
      .catch(error => {
        JL('controller').error(
          `error calling repository: ${JSON.stringify(error)}`
        );
        res.status(500).send({ error: `${JSON.stringify(error)}` });
      });
  },

  create: (req, res) => {
    service
      .create(req.body)
      .then(result => {
        JL('controller').info(
          `feature created sucessfully: ${JSON.stringify(result)}`
        );
        res.status(201).send(result);
      })
      .catch(error => {
        JL('controller').error(
          `error calling repository: ${JSON.stringify(error)}`
        );
        res.status(500).send({ error: `${JSON.stringify(error)}` });
      });
  },

  update: (req, res) => {
    service
      .update(req.body)
      .then(result => {
        JL('controller').info(
          `feature updated sucessfully: ${JSON.stringify(result)}`
        );
        res.send(result);
      })
      .catch(error => {
        JL('controller').error(
          `error calling repository: ${JSON.stringify(error)}`
        );
        res.status(500).send({ error: `${JSON.stringify(error)}` });
      });
  },

  delete: (req, res) => {
    service
      .delete(req.params.id)
      .then(result => {
        JL('delete').info({ id: req.params.id, result });
        res.send(result);
      })
      .catch(error => {
        JL().error(error);
        res.status(500).send({ error });
      });
  }
};
