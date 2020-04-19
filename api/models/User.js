const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    sub: {type: String, required:true}
});

const Users = mongoose.model('User', UserSchema, 'users');

module.exports = Users;