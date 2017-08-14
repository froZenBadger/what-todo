(function() {
  function Todos($http) {
    return {
      get : function() {
        return $http.get('/api/todos');
      },
      create : function(todoData) {
        return $http.post('/api/todos', todoData);
      },
      delete : function(id) {
        return $http.delete('/api/todos/' + id);
      }
    }
  }

  angular
    .module('todo')
    .factory('Todos', ['$http', Todos]);
})();
