const JL = require('jsnlog').JL;
const repository = require('../infra/repositories/user-repository');
const moment = require('moment');

module.exports = {
  list: () => {
    return repository.getAll();
  },

  getById: id => {
    return new Promise((resolve, reject) => {
      repository
        .find({ query: { _id: id } })
        .then(result => {
          if (result.length == 1) {
            let user = result[0];
            user.birthdate = moment.utc(user.birthdate);
            resolve(user);
          } else if (result.length <= 0) {
            reject(`The user was not found`);
          } else {
            reject(`Found ${result.length} user with (${id})`);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  create: entity => {
    entity.birthdate = moment.utc(entity.birthdate);
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
                JL('user-service:create').error(err);
                reject(err);
              });
          } else {
            reject(`"user already exists" ${JSON.stringify(result.name)}`);
          }
        });
      } else {
        reject('error');
      }
    });
  },

  update: entity => {
    entity.birthdate = moment.utc(entity.birthdate);
    return new Promise((resolve, reject) => {
      repository
        .find({ query: { _id: entity._id } })
        .then(result => {
          JL('user-service:update').info('find');
          if (result.length >= 1) {
            repository
              .update(entity)
              .then(result => {
                resolve(result);
              })
              .catch(error => {
                JL('user-service:update error').error(error);
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
