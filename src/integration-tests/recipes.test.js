const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app')
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { mockDBMemory } = require('./util');

chai.use(chaiHttp);

describe('2 - Validating endpoint "post" from path "/recipes/"', () => {

  describe('2.1 - ', () => {

  });
});
