const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../api/app')
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { mockDBMemory } = require('./util');

chai.use(chaiHttp);

const { expect } = chai;

const usuárioValido = {
  name: 'Erick Jacquin',
  email: 'erickjacquin@gmail.com',
  password: '12345678'
}

const usuárioInvalido = {
  name: 'Henrique Fogaça', 
  email: 'erickjacquin@gmail.com',
  password: '123456789'
}

describe('1 - Validating endpoint "POST" from path "/users/"', () => {
  
  describe('1.1 - Validating body error messages', () => {
    let response;

    before(async () => {
      response = await chai.request(server).post('/users/').send({});
    });

    it('Will be checked if it returns a 400 status code.', () => {
      expect(response).to.have.status(400);
    })

    it('Will be checked if the body is an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('Will be checked if the body contains the property "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Will be checked if the "message" property contains the text "Invalid entries. Please try again."',() => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
    
  });

  describe('1.2 - Validate error messages if the email has already been registered', () => {
    const DBServer = new MongoMemoryServer();
    let response;

    before(async() => {
      const connectionMock = await mockDBMemory(DBServer);
        await connectionMock.db('Cookmaster').collection('users').insertOne(usuárioValido);

      response = await chai.request(server).post('/users/').send(usuárioInvalido);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Will be checked if it returns a 409 status code.', () => {
      expect(response).to.have.status(409)
    });

    it('Will be checked if the body is an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('Will be checked if the body contains the property "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('Will be checked if the "message" property contains the text "Email already registered"',() => {
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });
  
  describe('1.3 - Validating when registering a user successfully', () => {
    const DBServer = new MongoMemoryServer();
    let response;

    before(async() => {
      await mockDBMemory(DBServer);
      response = await chai.request(server).post('/users/').send(usuárioValido);
    });

    after(async () => {
      MongoClient.connect.restore();
      await DBServer.stop();
    });

    it('Will be checked if it returns a 201 status code.', () => {
      expect(response).to.have.status(201);
    });

    it('Will be checked if the body is an object', () => {
      expect(response.body).to.be.an('object');
    });

    it('Will be checked if the body contains the property "user"', () => {
      expect(response.body).to.have.a.property('user');
    });

    it('The body of the "user" must contain the user properties', () => {
      expect(response.body.user).to.have.a.property('_id');
      expect(response.body.user).to.have.a.property('role').equal('user');
      expect(response.body.user).to.have.a.property('name').equal(usuárioValido.name);
      expect(response.body.user).to.have.a.property('email').equal(usuárioValido.email);
    });
  });

});

// Agradecimentos a Leandro Reis Turma 10 - Tribo B pelo auxilio na construção dos Testes User