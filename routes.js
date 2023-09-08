const express = require('express');
const router = express.Router();

const { 
  index , 
  get, 
  update, 
  destroy, 
  create 
} = require('./controllers/UserController');


router.get('/users', index);

router.get('/users/:id', get);

router.post('/users', create);

router.put('/users/:id', update);

router.delete('/users/:id', destroy);


module.exports = router;