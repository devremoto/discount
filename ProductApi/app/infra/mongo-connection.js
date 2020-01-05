const mongoose = require('mongoose');
const consts = require('../config/config');
const DB_URL = process.env.DB_URL || consts.DB_URL;

module.exports = {
    createConnection: () => {
        return new Promise((resolve, reject) => {
            let objConn = {}
            mongoose.connect(
                DB_URL,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (error) => {
                    if (error) {
                        return reject(objConn);
                    } else {
                        return resolve(objConn)
                    }

                }
            );
        })
    },
    add: async (model, data) => {
        if (data instanceof Array) {
            return await model.insertMany(data);
        } else {
            return await new model(data).save();
        }
    },
    update: async (model, data) => {
        await model.findOneAndUpdate({ _id: data._id }, data);
        return data;
    },
    delete: async (model, id) => {
        const docs = await model.findOneAndDelete({ _id: id });
        return docs;
    },
    getAll: async (model) => {
        const docs = await model.find({});
        return docs;
    },
    find: async (data) => {
        const docs = await data.model.find(data.query);
        return docs;
    }
}
