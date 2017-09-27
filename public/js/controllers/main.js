angular.module('todoController', [])

	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;

		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});

		$scope.createTodo = function() {

			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				Todos.create($scope.formData)

					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {};
						$scope.todos = data;
					})
					.error(function(data) {
						console.log('Error: ' + data);
					});
			}
		};
/// delete
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};
///// reorder
		var reorderTodos = function() {
			Todos.get()
				.success(function(data) {
					$scope.todos = data;
					$scope.loading = false;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};

		$scope.archiveTodo = function(todo){
			$scope.loading = true;
			var status = {completed: todo.completed};
			Todos.update(todo._id, status)
				.success(function(data) {
					$scope.loading = false;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});

			reorderTodos();
		};

		$scope.completed = function(todo) {
			return todo.completed == true;
		}
/// badge counter
		$scope.numberOfActiveTodos = function(todos) {
			var numberActive = 0;
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].completed == false) {
					numberActive++;
					// if (expired(todos[i]) == false ) {
					// 		numberActive++;
					// }
				}
			}
			return numberActive;
		};

		$scope.showMe = true;
		$scope.showYou = true;
//// auto hide completeds
		$scope.noneCompleted = function(todos) {
			for (var i = 0; i < todos.length; i++) {
				if (todos[i].completed == true) {
					return false;
				}
			}
			return true;
		};
/// order by priority
		$scope.myPriority = function(todo) {
			switch (todo.priority) {
				case 'high':
					return 3;
				case 'medium':
					return 2;
				case 'low':
					return 1;
			}
		};

///////// Features in progress
		// 2) Show expired tasks
		// Return true if todo is expired i.e. more than 7 days old
		$scope.expired = function(todo) {
			//in millisecs with logic #1
			var sevenDaysInMilliSecs = 604800000;
			var currentTime = Date.now();
			var sevenDaysAgo = currentTime - sevenDaysInMilliSecs;
			return (todo.created_at <= sevenDaysAgo);
			// In secs with logic #2
			// var sevenDaysInSecs = 604800;
			// var currentTime = Date.now();
			// return ( (((todo.created_at/1000) + sevenDaysInSecs) - (currentTime/1000)) <= 0 );
		};

		$scope.noneExpired = function(todos) {
			for (var i = 0; i < todos.length; i++) {
				if (expired(todos[i]) == true) {
					return false;
				}
			}
			return true;
		};



	}]);
