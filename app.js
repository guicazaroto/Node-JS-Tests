const express = require('express');
const mongoose = require('./db'); 
const User = require('./models/User'); 
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes)


app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});
