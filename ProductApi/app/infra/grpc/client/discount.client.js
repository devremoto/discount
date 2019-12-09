const grpc = require('grpc');
const consts = require('../../../config/config');

var rpcClient = {
  getService: service => {
    const PROTO_PATH = `/../protos/${service}.proto`;
    var path = __dirname + PROTO_PATH;

    const loader = grpc.load(path);
    var service = loader.ProductRPC[`${service}RPCService`];
    const client = new service(
      consts.GRPC_SERVER,
      grpc.credentials.createInsecure()
    );
    return client;
  }
};

module.exports = rpcClient;
