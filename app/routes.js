var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            due_date: req.body.due_date,
            priority: req.body.priority
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // update a todo - NOT being used
    app.put('/api/todos/:todo_id', function (req, res) {
      var db = req.db;
      var updateTodo = req.body;
      delete updateTodo._id;
      delete updateTodo.text;

      db.collection("Todo").updateOne({_id: new ObjectID(req.params.id)}, updateTodo,
        function(err, data) {
          if (err) {
            handleError(res, err.message, "Failed to update todo");
          } else {
            getTodos(res);
            res.status(204).end();
          }
        });
      });
    //   Todo.update({_id: req.params.todo_id}, bool,
    //     function (err, todo) {
    //       if (err) {
    //           res.send(err);
    //       }
    //       res.send(todo);
    //     });
    // });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
