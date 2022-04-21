const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app')
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { mockDBMemory } = require('./util');

chai.use(chaiHttp);
const { expect } = chai;

const usuário = {
  name: 'Frango',
  ingredients: 'Frango, sazon',
  preparation: '10 minutos no forno'
};

describe('2 - Validating endpoint "post" from path "/recipes/"', () => {
  
  describe('2.1 - Validating body error messages', () => {
    let response;
    before(async () => {
      response = await chai.request(server).post('/recipes/').send({});
    });

    it('Will be checked if it returns a 400 status code.', () => {
      expect(response).to.have.status(400);
    });

    it('Will be checked if the body is an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('Will be checked if the body contains the property "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Will be checked if the "message" property contains the text "Invalid entries. Try again."',() => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });

  });

  describe('2.2 - Validating when registering a user successfully', () => {
    const DBServer = new MongoMemoryServer();
    let response;
    before(async() => {
      await mockDBMemory(DBServer);
      response = await chai.request(server).post('/recipes/').set('authorization', ).send(usuário);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });
  });
});
