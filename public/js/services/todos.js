angular.module('todoService', [])
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			update : function(id, status) {
				return $http.put('/api/todos/' + id, status);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);
