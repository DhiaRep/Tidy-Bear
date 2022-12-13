const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },

        title: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },

        description: {  type: String
        },

        date: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },

        place: {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
    }
)

const Task = mongoose.model('Task', TaskSchema);
module.exports = { Task };