const express = require('express');
const { userRouter, loginRouter } = require('../routes/index');

const app = express();

app.use(express.json());
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter);

app.use('/login', loginRouter);

module.exports = app;
