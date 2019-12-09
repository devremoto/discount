const connection = require('../mongo-connection');
const model = require('../../models/product');
const JL = require('jsnlog').JL;


module.exports = {
    add: (data) => {
        return new Promise((resolve, reject) => {
            if (data.parent) {
                data.parent = data.parent._id;
            }
            connection
                .add(model, data)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    delete: (id) => {
        return new Promise((resolve, reject) => {
            connection
                .delete(model, id)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    },

    update: (data) => {
        return new Promise((resolve, reject) => {
            connection
                .update(model, data)
                .then(res => {
                    console.log(data);
                    JL('repository').info(
                        `update - OK:${JSON.stringify(data)} ${JSON.stringify(
                            res
                        )}`
                    );
                    resolve(res);
                })
                .catch(err => {
                    JL('repository').error(
                        `update - ERROR:${JSON.stringify(
                            data
                        )} ${JSON.stringify(err)}`
                    );
                    reject(err);
                });
        });
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            connection
                .getAll(model)
                .then(docs => {
                    resolve(docs);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    find: data => {
        return connection.find({ model, query: data.query });
    }
};
