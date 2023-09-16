const User = require('../models/User'); 

const index =  async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



const get = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const create = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const destroy = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado' });
    } else {
      res.json({ message: 'Usuário excluído com sucesso' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  index,
  get,
  create,
  update,
  destroy
}