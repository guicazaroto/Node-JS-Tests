const mongoose = require('mongoose');

class DB {
  init() {
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

module.exports = new DB();
