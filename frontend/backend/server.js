const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); 
const todoRoutes = express.Router();  

const PORT = 4000;

let Todo = require('./todo.model');
let User = require('./user.model')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true});
const connection = mongoose.connection; 

// app.listen(PORT, function() {
// 	console.log("Server running on port:" + "PORT");
// }); 

// const db = require("./config/keys").mongoURI;

// mongoose.connect(
// 	db, {useNewUrlParser: true}
// 	)
// .then(()=> console.log("SUCCESS CONNECT"))
// .catch(err => console.log(err));


// const PORT = process.env.PORT || 4000;

connection.once('open', function() {
	console.log("MONGODB success");
});

todoRoutes.route('/').get(function(req, res) {
	Todo.find(function(err, todos) {
		if (err) {
			console.log(err);
		} else {
			res.json(todos); 
		}
	});
});

todoRoutes.route('/all').get(function(req, res) {
	Todo.find(function(err, todos) {
		if (err) {
			console.log(err);
		} else {
			res.json(todos); 
		}
	});
});

todoRoutes.route('/:id').get(function(req, res) {
	let id = req.params.id;
	Todo.findById(id, function(err, todo) {
		res.json(todo);
	});
});

todoRoutes.route('/delete/:id').delete(function(req, res) {
	let id = req.params.id;
	Todo.findByIdAndRemove(id, (err, todo) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Todo successfully deleted",
        id: todo._id
    };
    return res.status(200).send(response);
});
});

todoRoutes.route('/find/:name').get(function(req, res) {
	let name = req.params.name;
	Todo.find({"trans_notary_id" : name}, function(err, todo) {
		res.json(todo);
	});
});

todoRoutes.route('/verify/:username/:password').get(function(req, res) {
	let name = req.params.username;
	let pass = req.params.password; 
	User.find({"username" : name, "password" : pass}, function(err, todo) {
		res.json(todo);
	});
});

todoRoutes.route('/getInfo/:username').get(function(req, res) {
	let name = req.params.username;
	User.find({"username" : name}, function(err, todo) {
		res.json(todo);
	});
});

todoRoutes.route('/users/delete/:id').delete(function(req, res) {
	let id = req.params.id;
	User.findByIdAndRemove(id, (err, todo) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "User successfully deleted",
        id: todo._id
    };
    return res.status(200).send(response);
});
});

todoRoutes.route('/add').post(function(req, res) {
	let todo = new Todo(req.body);
	todo.save()
	.then(todo => {
		res.status(200).json({'todo': 'add success'});
	})
	.catch(err => {
		res.status(400).send('add failed'); 
	}); 
});

todoRoutes.route('/users/add').post(function(req, res) {
	let usr = new User(req.body);
	usr.save()
	.then(usr => {
		res.status(200).json({'usr': 'add success'});
	})
	.catch(err => {
		res.status(400).send('add failed'); 
	}); 
});

todoRoutes.route('/users/get').get(function(req, res) {
	User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users); 
		}
	});
});


todoRoutes.route('/update/:id').post(function(req, res) {
	Todo.findById(req.params.id, function(err, todo) {
		if (!todo) 
			res.status(404).send('data not found');
		else 
			todo.trans_seller = req.body.trans_seller;
			todo.trans_info = req.body.trans_info;
			todo.trans_docs = req.body.trans_docs;
			todo.trans_completed = req.body.trans_completed;

			todo.save().then(todo => {
				res.json('Todo updated');
			})
			.catch(err => {
				res.status(400).send("Update not possible");
			});
	});
});

app.use('/todos', todoRoutes); 

app.listen(PORT, function() {
	console.log("Server running on Port: " + PORT);
});

