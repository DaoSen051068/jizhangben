const mongoose = require('mongoose')

let AccountSchem = new mongoose.Schema({
title:{
    type:String,
    requiresd:true
},
time:Date,
type:{
    type:Number,
    default:-1
},
account:{
    type:Number,
    required:true
},
remarks:{
    type:String ,

}
});

let AccountModel = mongoose.model('accounts',AccountSchem)

module.exports = AccountModel;