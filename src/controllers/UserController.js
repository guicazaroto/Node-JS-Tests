const User = require('../models/User'); 
const apiResponse = require('../helpers/apiResponse');

const index =  async (req, res) => {
  try {
    const users = await User.find({});
    apiResponse(res, 200, users)
  } catch (err) {
    apiResponse(res, 500, { error: err.message })
  }
}



const get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      apiResponse(res, 404, { message: 'Usuário não encontrado' });
    } else {
      apiResponse(res, 200, user);
    }
  } catch (err) {
    apiResponse(res, 500, { error: err.message });
  }
}

const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    apiResponse(res, 201, user);
  } catch (err) {
    apiResponse(res, 400, { error: err.message });
  }
}


const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      apiResponse(res, 404, { message: 'Usuário não encontrado' });
    } else {
      apiResponse(res, 200, user);
    }
  } catch (err) {
    apiResponse(res, 500, { error: err.message });
  }
}

const destroy = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      apiResponse(res, 404, { message: 'Usuário não encontrado' });
    } else {
      apiResponse(res, 200, user);
    }
  } catch (err) {
    apiResponse(res, 500, { error: err.message });
  }
}

module.exports = {
  index,
  get,
  create,
  update,
  destroy
}