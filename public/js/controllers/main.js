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
//Not being used
		$scope.archiveTodo = function(id, isCom) {
			$scope.loading = false;
			var status = {"completed":isCom}

			Todos.update(id, status)
				.success(function(data) {
					// $scope.loading = false;
					$scope.todos = data;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};

// Code for determining whether todo is expired or active
		$scope.currentTime = new Date().getTime();
		var seven_days = 604800000;

// Return true if todo is expired
		$scope.expired = function(task) {
      var currentTime = new Date().getTime();
      return ( ((task.createdAt + seven_days) - currentTime) <= 0 )
    }

// Return true if todo is completed
		$scope.completed = function(task) {
			return task.completed == true
		}

		//Testing for updated todo list when checkbox is checked
		$scope.checked = function(){
			Todos.get()
				.success(function(data) {
					$scope.todos = data;
					$scope.loading = false;
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		}
	}]);
