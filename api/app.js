const express = require('express');
const app = express();
const { mongoose } = require('./db/mongoose');  //connect to db

const bodyParser = require('body-parser');
//load mongoose models
const { Task } = require('./db/models/task.model');

//load middleware required for REST API
// parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());

app.listen(3000, () => {console.log('Server started on port 3000')});

//task routes
//get all tasks
app.get('/tasks', (req, res) => {   //get all tasks from db and send them back to client
    Task.find().then((tasks) => {
        res.send({tasks});
    }, (e) => {
        res.status(400)
        .send
    });
});

//create a new task via frontend
app.post('/tasks', (req, res) => {  //create a new task
    let title = req.body.title;
    let description = req.body.description;
    let date = req.body.date;
    let place = req.body.place;
    let newTask = new Task({title, description, date, place});
    newTask.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res
        .status(400)
        .send
    });
});




//update a task via frontend
app.patch('/tasks/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['title', 'description', 'date', 'place']);
    Task.findByIdAndUpdate(id, {$set: body}, {new: true}).then((task) => {  //find task by id and update it
        if (!task) {
            return res.status(404).send();
        }
        res.send({task});
    }).catch((e) => {
        res.status(400).send();
    })
});


//delete a task via frontend
app.delete('/tasks/:id', (req, res) => {  //delete a task
    let id = req.params.id;
    Task.findByIdAndRemove(id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }
        res.send({task});
    }).catch((e) => {
        res.status(400).send();
    })
});





//testing with postman was gucci

