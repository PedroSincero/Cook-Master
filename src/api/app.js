const express = require('express');
const { userRouter } = require('../routes/index');

const app = express();

app.use(express.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter);

module.exports = app;
