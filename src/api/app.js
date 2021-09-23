const express = require('express');
const { userRouter, loginRouter, recipesRouter } = require('../routes/index');

const app = express();

app.use(express.json());

app.use('/images', express.static('src/uploads'));
// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', userRouter);

app.use('/login', loginRouter);

app.use('/recipes', recipesRouter);

module.exports = app;
