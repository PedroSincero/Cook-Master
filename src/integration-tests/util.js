const { MongoClient } = require('mongodb');
const sinon = require('sinon');

const mockDBMemory = async (DBServer) => {
  const URLMock = await DBServer.getUri();
  const connectionMock = await MongoClient.connect(URLMock,
    { useNewUrlParser: true, useUnifiedTopology: true });

  sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  return connectionMock;
}

module.exports = {
  mockDBMemory
}