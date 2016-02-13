var Todo = require('./models/todo');
var Actor = require('./models/actor');

function getAllCountryActors(res){
	Actor.find(function(err,countryActors){
		if(err)
			res.send(err)
		res.json(countryActors);
	});
}

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	//get all country actors
	app.get('/api/countryActors', function(req,res){
		getAllCountryActors(res);
	})

	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		getTodos(res);
	});
	//create new country actor
	app.post('/api/countryActors',function(req,res){
		Actor.create({
			name:req.body.text,

		},function(err){
			if(err)
				res.send(res);
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};