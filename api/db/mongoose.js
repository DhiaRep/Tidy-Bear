// connection to mongodb
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//load models
const { Task } = require('./models/task.model');

mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = mongoose;