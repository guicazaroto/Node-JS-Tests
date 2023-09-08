const routes = require('express').Router();

const { 
  index , 
  get, 
  update, 
  destroy, 
  create 
} = require('./controllers/UserController');


routes.get('/users', index);

routes.get('/users/:id', get);

routes.post('/users', create);

routes.put('/users/:id', update);

routes.delete('/users/:id', destroy);


module.exports = routes;