const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);


userSchema.set('toJSON', {
  virtuals: true
});

module.exports = User;
