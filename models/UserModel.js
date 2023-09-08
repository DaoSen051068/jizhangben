const mongoose = require('mongoose')

let UserSchem = new mongoose.Schema({
  username:String,
  password:String
});

let UserModel = mongoose.model('users',UserSchem)

module.exports = UserModel;